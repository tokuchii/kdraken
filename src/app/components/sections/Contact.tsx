"use client";

import { useState, FormEvent, useRef } from "react";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { socialLinks } from "@/lib/data";
import FadeIn from "../ui/FadeIn";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function sanitizeInput(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [errorMsg, setErrorMsg] = useState("");
  const loadTime = useRef(Date.now());
  const lastSubmit = useRef(0);

  function validate(): FormErrors {
    const e: FormErrors = {};
    const name = sanitizeInput(formData.name);
    const email = sanitizeInput(formData.email);
    const subject = sanitizeInput(formData.subject);
    const message = sanitizeInput(formData.message);

    if (!name) e.name = "Name is required";
    else if (name.length < 2) e.name = "Name must be at least 2 characters";
    else if (name.length > 100) e.name = "Name must be under 100 characters";

    if (!email) e.email = "Email is required";
    else if (!validateEmail(email)) e.email = "Please enter a valid email";

    if (!subject) e.subject = "Subject is required";
    else if (subject.length > 200) e.subject = "Subject must be under 200 characters";

    if (!message) e.message = "Message is required";
    else if (message.length < 10) e.message = "Message must be at least 10 characters";
    else if (message.length > 2000) e.message = "Message must be under 2000 characters";

    return e;
  }

  function handleChange(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    const now = Date.now();
    if (now - lastSubmit.current < 5000) {
      setErrorMsg("Please wait before submitting again.");
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    lastSubmit.current = now;
    setFormState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sanitizeInput(formData.name),
          email: sanitizeInput(formData.email),
          subject: sanitizeInput(formData.subject),
          message: sanitizeInput(formData.message),
          lt: loadTime.current,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setFormState("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      setFormState("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-20 xl:py-24">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-0 text-center">
        <FadeIn>
          <h2
            className="font-medium text-text-1 mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
          >
            Let&apos;s build something.
          </h2>

          <p className="text-text-2 max-w-md mx-auto mb-8">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of something great.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <form onSubmit={handleSubmit} className="text-left space-y-4 mb-8" noValidate>
            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              <input type="text" name="url" tabIndex={-1} autoComplete="off" />
              <input type="text" name="hp" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-2 mb-1">Your Name *</label>
                <input
                  id="name"
                  type="text"
                  maxLength={100}
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="John Doe"
                  autoComplete="name"
                  className={`w-full px-4 py-3 rounded-xl bg-surface-1 border text-text-1 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${errors.name ? "border-red-500" : "border-border"}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-2 mb-1">Email *</label>
                <input
                  id="email"
                  type="email"
                  maxLength={254}
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`w-full px-4 py-3 rounded-xl bg-surface-1 border text-text-1 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${errors.email ? "border-red-500" : "border-border"}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-text-2 mb-1">Subject *</label>
              <input
                id="subject"
                type="text"
                maxLength={200}
                value={formData.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                placeholder="Project Discussion"
                className={`w-full px-4 py-3 rounded-xl bg-surface-1 border text-text-1 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${errors.subject ? "border-red-500" : "border-border"}`}
              />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-2 mb-1">Message *</label>
              <textarea
                id="message"
                rows={5}
                maxLength={2000}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Tell me about your project or just say hello!"
                className={`w-full px-4 py-3 rounded-xl bg-surface-1 border text-text-1 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-colors resize-none ${errors.message ? "border-red-500" : "border-border"}`}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>

            {formState === "sent" && (
              <div className="flex items-center gap-2 text-green-500 text-sm">
                <CheckCircle size={16} /> Message sent successfully!
              </div>
            )}
            {(formState === "error" || errorMsg) && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle size={16} /> {errorMsg || "Failed to send message. Please try again."}
              </div>
            )}

            <button
              type="submit"
              disabled={formState === "sending"}
              className="btn-hover inline-flex items-center justify-center px-8 py-3 bg-accent text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity min-h-[44px] min-w-[44px] disabled:opacity-50"
            >
              <Send size={16} className="mr-2" />
              {formState === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex items-center justify-center gap-6 mb-8">
            <a
              href={`mailto:${socialLinks.email}`}
              className="flex items-center gap-2 text-text-2 hover:text-text-1 transition-all duration-200 hover:scale-105 min-h-[44px] min-w-[44px] justify-center"
            >
              <Mail size={20} />
              <span className="text-sm">Email</span>
            </a>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-2 hover:text-text-1 transition-all duration-200 hover:scale-105 min-h-[44px] min-w-[44px] justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-2 hover:text-text-1 transition-all duration-200 hover:scale-105 min-h-[44px] min-w-[44px] justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              <span className="text-sm">LinkedIn</span>
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-2 hover:text-text-1 transition-all duration-200 hover:scale-105 min-h-[44px] min-w-[44px] justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span className="text-sm">Facebook</span>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="font-mono text-xs text-text-2 mt-8">
            © 2025 Kenneth Kieser Macabos · Built with Next.js
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
