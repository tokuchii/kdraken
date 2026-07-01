"use client";

import { useState, FormEvent, useRef } from "react";
import { Send, ArrowUpRight, ArrowRight } from "lucide-react";
import { toast } from "sonner";
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
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const loadTime = useRef(Date.now());
  const lastSubmit = useRef(0);
  const sendBtnRef = useRef<HTMLButtonElement>(null);

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

    const now = Date.now();
    if (now - lastSubmit.current < 5000) {
      toast.warning("Please wait before submitting again.");
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    lastSubmit.current = now;
    setSending(true);

    const toastId = toast.loading("Sending your message...");

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

      toast.success("Message sent!", {
        id: toastId,
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      toast.error("Failed to send", {
        id: toastId,
        description: err instanceof Error ? err.message : "Something went wrong. Please try again later.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="relative py-10 sm:py-14 xl:py-16 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <img
          src="/files/spider2.png"
          alt=""
            className="hidden lg:block h-[40vh] lg:h-[80vh] w-auto object-contain opacity-20 dark:invert"
          style={{ transform: "translateX(-109%) translateY(-65px)" }}
        />
      </div>
      <div className="relative max-w-[720px] mx-auto px-4 sm:px-6 lg:px-0 text-center">
        <FadeIn>
          <h2
            className="font-extrabold text-text-1 mb-4 tracking-tight"
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
              <div className="kinetics-field">
                <input
                  id="name"
                  type="text"
                  maxLength={100}
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder=" "
                  autoComplete="name"
                  className={`w-full px-4 py-3 rounded-xl bg-surface-1 border text-text-1 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${errors.name ? "border-red-500" : "border-border"}`}
                />
                <label htmlFor="name">Your Name *</label>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="kinetics-field">
                <input
                  id="email"
                  type="email"
                  maxLength={254}
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder=" "
                  autoComplete="email"
                  className={`w-full px-4 py-3 rounded-xl bg-surface-1 border text-text-1 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${errors.email ? "border-red-500" : "border-border"}`}
                />
                <label htmlFor="email">Email *</label>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            <div className="kinetics-field">
              <input
                id="subject"
                type="text"
                maxLength={200}
                value={formData.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                placeholder=" "
                className={`w-full px-4 py-3 rounded-xl bg-surface-1 border text-text-1 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${errors.subject ? "border-red-500" : "border-border"}`}
              />
              <label htmlFor="subject">Subject *</label>
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>
            <div className="kinetics-field">
              <textarea
                id="message"
                rows={5}
                maxLength={2000}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder=" "
                className={`w-full px-4 py-3 rounded-xl bg-surface-1 border text-text-1 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-colors resize-none ${errors.message ? "border-red-500" : "border-border"}`}
              />
              <label htmlFor="message">Message *</label>
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>

            <button
              ref={sendBtnRef}
              type="submit"
              disabled={sending}
              className="btn-hover inline-flex items-center justify-center px-8 py-3 bg-accent text-background text-sm font-medium rounded-xl hover:opacity-90 transition-opacity min-h-[44px] min-w-[44px] disabled:opacity-50"
            >
              <Send size={16} className="mr-2" />
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </FadeIn>

        <FadeIn delay={0.15}>
          <a
            href="https://buymeacoffee.com/kendrake"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 text-text-2 text-xs mb-8 hover:text-text-1 transition-colors"
          >
            buy me a coffee? <ArrowUpRight size={14} />
          </a>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="font-mono text-xs text-text-2 mt-8">
            © 2025 Kenneth Kieser Macabos · Built with Next.js
          </p>

          <p className="font-mono text-xs text-text-2/60 mt-2 italic">
  &ldquo;With great power comes great responsibility.&rdquo;
</p>
        </FadeIn>
      </div>
    </section>
  );
}
