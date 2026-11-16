"use client";

import { useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";

const projectTypes = [
  "AI film",
  "AI commercial",
  "Brand film",
  "Cinematic editing",
  "Creative direction",
  "Something else",
];

const budgets = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $30,000",
  "$30,000+",
  "Not sure yet",
];

const timelines = ["ASAP", "2–4 weeks", "1–2 months", "This quarter", "Just exploring"];

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
      projectType: String(data.get("projectType") ?? "").trim(),
      budget: String(data.get("budget") ?? "").trim(),
      timeline: String(data.get("timeline") ?? "").trim(),
      brief: String(data.get("brief") ?? "").trim(),
      consent: data.get("consent") === "on",
    };

    if (!payload.name || !payload.email || !payload.brief) {
      setError("Please add your name, email and a short brief.");
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
      if (!response.ok) throw new Error("request failed");
      setState("success");
      form.reset();
      track("form_submit", {
        project_type: payload.projectType || "unspecified",
        budget: payload.budget || "unspecified",
      });
    } catch {
      setState("error");
      setError(
        "Something went wrong sending the brief. Please email hello@ropona.studio directly."
      );
    }
  }

  if (state === "success") {
    return (
      <div className="mt-8 border border-gold/30 bg-gold/[0.04] p-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 text-gold">
          ✓
        </span>
        <h3 className="serif mt-5 text-2xl text-bone">Brief received.</h3>
        <p className="mt-2 text-sm leading-relaxed text-mist">
          Thank you — I&apos;ll read it properly and reply within one working day.
          If it is urgent, WhatsApp is the fastest route.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-goldsoft"
        >
          Send another brief
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-7" noValidate>
      <div className="grid gap-7 sm:grid-cols-2">
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

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="field-label">
            Company / project
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
          <label htmlFor="projectType" className="field-label">
            What do you need?
          </label>
          <select id="projectType" name="projectType" className="field">
            <option value="">Select a service</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className="field-label">
            Budget range
          </label>
          <select id="budget" name="budget" className="field">
            <option value="">Select a range</option>
            {budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className="field-label">
            Timeline
          </label>
          <select id="timeline" name="timeline" className="field">
            <option value="">When do you need it?</option>
            {timelines.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="brief" className="field-label">
          The brief *
        </label>
        <textarea
          id="brief"
          name="brief"
          rows={5}
          required
          className="field resize-none"
          placeholder="A paragraph is enough. What are you making, who is it for, and what should it make them feel?"
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-[0.68rem] leading-relaxed text-mist">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-3.5 w-3.5 shrink-0 appearance-none border border-white/30 bg-transparent checked:border-gold checked:bg-gold checked:bg-[length:70%] checked:bg-center checked:bg-no-repeat checked:[background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 10 10%22><path d=%22M1 5l2.5 2.5L9 1.5%22 fill=%22none%22 stroke=%22%23211a15%22 stroke-width=%221.5%22/></svg>')]"
        />
        <span>
          I&apos;m happy for Ropona Benard to store this brief to respond to my enquiry.
        </span>
      </label>

      {error && (
        <p role="alert" className="border-l border-red-400/60 pl-3 text-xs text-red-300">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
        <p className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-muted">
          Replies within 24 hours
        </p>
        <button
          type="submit"
          disabled={state === "sending"}
          className="btn btn-gold disabled:cursor-wait disabled:opacity-60"
          data-track="form_submit_attempt"
        >
          {state === "sending" ? "Sending…" : "Send project brief"}
          {state !== "sending" && <span aria-hidden="true">↗</span>}
        </button>
      </div>
    </form>
  );
}
