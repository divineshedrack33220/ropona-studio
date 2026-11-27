"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/content";
import { track } from "@/lib/analytics";

const opportunityTypes = [
  "Employment / remote role",
  "Agency collaboration",
  "Project",
  "Other",
];

const timelines = [
  "As soon as possible",
  "1–3 months",
  "This quarter",
  "Just exploring",
];

type FormState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // honeypot — humans never fill this
    if (String(data.get("website") ?? "").length > 0) {
      setState("success");
      return;
    }

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      opportunityType: String(data.get("opportunityType") ?? "").trim(),
      timeline: String(data.get("timeline") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      consent: data.get("consent") === "on",
    };

    if (!payload.name || !payload.email || !payload.opportunityType || !payload.message) {
      setError("Please add your name, email, opportunity type and a short message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setError("That email doesn't look quite right.");
      return;
    }

    setError("");
    setState("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!response.ok) {
        throw new Error(
          typeof result.error === "string" ? result.error : "request failed"
        );
      }
      setState("success");
      form.reset();
      track("form_submit", { opportunity_type: payload.opportunityType });
    } catch (error) {
      setState("error");
      setError(
        error instanceof Error && error.message && error.message !== "request failed"
          ? error.message
          : `Something went wrong sending your enquiry. Please email ${site.email} directly.`
      );
    }
  }

  if (state === "success") {
    return (
      <div className="mt-8 rounded-panel border border-burgundy/20 bg-champagneLight p-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-burgundy/40 text-burgundy">
          ✓
        </span>
        <h3 className="serif mt-5 text-2xl text-dark">Message submitted.</h3>
        <p className="mt-2 text-sm leading-relaxed text-cocoa">
          Thank you for reaching out. Your message has been submitted.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-5 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-burgundy"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="field"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="field-label">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="field"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="field-label">
            Company / organisation
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className="field"
            placeholder="Optional"
          />
        </div>
        <div>
          <label htmlFor="opportunityType" className="field-label">
            Opportunity type *
          </label>
          <select id="opportunityType" name="opportunityType" className="field" required>
            <option value="">Select an option</option>
            {opportunityTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="timeline" className="field-label">
          Timeline
        </label>
        <select id="timeline" name="timeline" className="field">
          <option value="">Optional</option>
          {timelines.map((timeline) => (
            <option key={timeline} value={timeline}>
              {timeline}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="field-label">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="field resize-none"
          placeholder="Tell me about the role, team or project — and how you would like to work together."
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex cursor-pointer items-start gap-3 font-sans text-[0.68rem] leading-relaxed text-cocoa">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 shrink-0 appearance-none rounded border border-cocoa/40 bg-champagneLight checked:border-burgundy checked:bg-burgundy checked:bg-[length:70%] checked:bg-center checked:bg-no-repeat checked:[background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 10 10%22><path d=%22M1 5l2.5 2.5L9 1.5%22 fill=%22none%22 stroke=%22%23F2E8D5%22 stroke-width=%221.5%22/></svg>')]"
        />
        <span>
          I&apos;m happy for Ropona Bernard to store these details to respond to my
          enquiry.
        </span>
      </label>

      {error && (
        <p role="alert" className="border-l-2 border-burgundy pl-3 font-sans text-xs text-burgundy">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-burgundy/15 pt-6">
        <p className="max-w-[22rem] font-sans text-[0.58rem] leading-relaxed tracking-[0.02em] text-cocoa">
          Your details are used only to respond to your enquiry.
        </p>
        <button
          type="submit"
          disabled={state === "sending"}
          className="btn btn-gold disabled:cursor-wait disabled:opacity-60"
          data-track="form_submit_attempt"
        >
          {state === "sending" ? "Sending…" : "Send enquiry"}
          {state !== "sending" && <span aria-hidden="true">↗</span>}
        </button>
      </div>
    </form>
  );
}
