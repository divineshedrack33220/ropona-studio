import { NextResponse } from "next/server";
import site from "@/content/site.json";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  opportunityType?: string;
  timeline?: string;
  message?: string;
  consent?: boolean;
};

/** Very small in-memory throttle — good enough for a single-region deploy. */
const hits = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function throttled(key: string) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now - entry.first > WINDOW_MS) {
    hits.set(key, { count: 1, first: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

async function sendWithResend(payload: Required<Pick<Payload, "name" | "email" | "message">> & Payload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? site.email;
  const from = process.env.CONTACT_FROM ?? `Ropona Bernard <onboarding@resend.dev>`;
  if (!apiKey) return false;

  const rows: Array<[string, string]> = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Company", payload.company || "—"],
    ["Opportunity type", payload.opportunityType || "—"],
    ["Timeline", payload.timeline || "—"],
  ];

  const html = `
    <div style="font-family:Helvetica,Arial,sans-serif;color:#111;line-height:1.6">
      <h2 style="margin:0 0 16px">New website enquiry</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="color:#666;font-size:12px;text-transform:uppercase;letter-spacing:.08em">${label}</td><td style="font-size:14px">${escapeHtml(
                String(value)
              )}</td></tr>`
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px">Message</h3>
      <p style="white-space:pre-wrap;font-size:14px">${escapeHtml(payload.message)}</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `Website enquiry — ${payload.name}${
        payload.company ? ` (${payload.company})` : ""
      }`,
      html,
    }),
  });

  return response.ok;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (throttled(ip)) {
    return NextResponse.json(
      { ok: false, error: `Too many requests. Please email ${site.email} directly.` },
      { status: 429 }
    );
  }

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const opportunityType = String(payload.opportunityType ?? "").trim();
  const message = String(payload.message ?? "").trim();

  if (!name || !email || !opportunityType || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, opportunity type and message are required." },
      { status: 422 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 422 }
    );
  }
  if (message.length > 6000) {
    return NextResponse.json(
      { ok: false, error: "Message is too long. Please keep it under 6000 characters." },
      { status: 422 }
    );
  }

  const clean = {
    name,
    email,
    opportunityType,
    message,
    company: String(payload.company ?? "").slice(0, 160),
    timeline: String(payload.timeline ?? "").slice(0, 80),
    consent: Boolean(payload.consent),
  };

  try {
    const delivered = await sendWithResend(clean);
    if (!delivered) {
      // No working mail provider — never tell the visitor it was submitted.
      console.info("[contact] enquiry received but not delivered", {
        ...clean,
        email: "[redacted]",
        ip,
        at: new Date().toISOString(),
      });
      return NextResponse.json(
        {
          ok: false,
          delivered: false,
          error: `Email delivery is unavailable right now. Please email ${site.email} directly.`,
        },
        { status: 503 }
      );
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return NextResponse.json(
      { ok: false, error: `Delivery failed. Please email ${site.email}.` },
      { status: 502 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "POST a website enquiry." });
}
