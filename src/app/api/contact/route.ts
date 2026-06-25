import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createHash } from "crypto";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const MAX_BODY_SIZE = 4096;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const duplicateMap = new Map<string, number>();
const honeypotMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const DUPLICATE_WINDOW = 10 * 60 * 1000;
const MIN_FORM_TIME_MS = 3000;

function getClientIP(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || req.headers.get("x-real-ip")
    || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;

  entry.count++;
  return true;
}

function checkDuplicate(email: string, message: string): boolean {
  const hash = createHash("sha256").update(`${email}:${message}`).digest("hex");
  const now = Date.now();
  const lastSeen = duplicateMap.get(hash);

  if (lastSeen && now - lastSeen < DUPLICATE_WINDOW) return true;

  duplicateMap.set(hash, now);
  if (duplicateMap.size > 1000) {
    for (const [key, ts] of duplicateMap) {
      if (now - ts > DUPLICATE_WINDOW) duplicateMap.delete(key);
    }
  }
  return false;
}

function isKnownBotUA(ua: string | null): boolean {
  if (!ua) return true;
  const botPatterns = [
    /bot/i, /crawl/i, /spider/i, /slurp/i, /mediapartners/i,
    /headless/i, /phantom/i, /selenium/i, /puppeteer/i, /curl/i,
    /wget/i, /python-requests/i, /go-http/i, /java\//i,
  ];
  return botPatterns.some((p) => p.test(ua));
}

function sanitize(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_BODY_SIZE) {
      return NextResponse.json({ error: "Request too large" }, { status: 413 });
    }

    const ua = request.headers.get("user-agent");
    if (isKnownBotUA(ua)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (origin && host && !origin.includes(host)) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }

    const ip = getClientIP(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
    }

    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    if (body.website || body.url || body.hp) {
      return NextResponse.json({ success: true });
    }

    const loadTime = typeof body.lt === "number" ? body.lt : Date.now();
    if (Date.now() - loadTime < MIN_FORM_TIME_MS) {
      return NextResponse.json({ error: "Please take your time filling out the form." }, { status: 400 });
    }

    const rawName = typeof body.name === "string" ? body.name : "";
    const rawEmail = typeof body.email === "string" ? body.email : "";
    const rawSubject = typeof body.subject === "string" ? body.subject : "";
    const rawMessage = typeof body.message === "string" ? body.message : "";

    const name = sanitize(rawName);
    const email = sanitize(rawEmail);
    const subject = sanitize(rawSubject);
    const message = sanitize(rawMessage);

    const errors: Record<string, string> = {};
    if (!name || name.length < 2) errors.name = "Name must be at least 2 characters";
    else if (name.length > 100) errors.name = "Name must be under 100 characters";

    if (!email || !validateEmail(email)) errors.email = "A valid email is required";
    else if (email.length > 254) errors.email = "Email must be under 254 characters";

    if (!subject || subject.length < 1) errors.subject = "Subject is required";
    else if (subject.length > 200) errors.subject = "Subject must be under 200 characters";

    if (!message || message.length < 10) errors.message = "Message must be at least 10 characters";
    else if (message.length > 2000) errors.message = "Message must be under 2000 characters";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation failed", fields: errors }, { status: 400 });
    }

    const spamPatterns = [
      /https?:\/\//i, /<script/i, /javascript:/i, /on\w+\s*=/i,
      /<iframe/i, /<object/i, /<embed/i, /<form/i,
      /viagra|cialis|casino|lottery|winner|congratulations/i,
      /\b(buy now|click here|act now|limited time|free money)\b/i,
    ];
    if (spamPatterns.some((p) => p.test(message) || p.test(name) || p.test(subject))) {
      return NextResponse.json({ error: "Message contains disallowed content" }, { status: 400 });
    }

    if (checkDuplicate(email, message)) {
      return NextResponse.json({ error: "This message was recently sent. Please wait before sending again." }, { status: 429 });
    }

    const repeatedChars = /(.)\1{9,}/;
    const allCaps = /^[A-Z\s!@#$%^&*()]+$/;
    if (repeatedChars.test(message) || (message.length > 20 && allCaps.test(message))) {
      return NextResponse.json({ error: "Message content looks suspicious" }, { status: 400 });
    }

    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.SMTP_TO || process.env.SMTP_USER,
      subject: `[Portfolio] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
                  <tr>
                    <td style="background:linear-gradient(135deg,#2563EB 0%,#3B82F6 100%);padding:32px 40px;">
                      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600;letter-spacing:-0.3px;">New Message from Portfolio</h1>
                      <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">${dateStr} at ${timeStr}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:32px 40px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-bottom:20px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border-radius:12px;padding:20px;border:1px solid #e2e8f0;">
                              <tr>
                                <td style="padding:0 20px 12px 20px;">
                                  <p style="margin:0;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">From</p>
                                  <p style="margin:4px 0 0;font-size:16px;font-weight:600;color:#1e293b;">${name}</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding:12px 20px;">
                                  <p style="margin:0;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Email</p>
                                  <p style="margin:4px 0 0;font-size:14px;color:#2563EB;">${email}</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding:12px 20px 20px 20px;">
                                  <p style="margin:0;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Subject</p>
                                  <p style="margin:4px 0 0;font-size:14px;color:#1e293b;">${subject}</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p style="margin:0 0 8px;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Message</p>
                            <div style="background-color:#f8fafc;border-radius:12px;padding:20px;border:1px solid #e2e8f0;font-size:15px;line-height:1.6;color:#334155;white-space:pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br />")}</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:20px 40px;background-color:#f8fafc;border-top:1px solid #e2e8f0;">
                      <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">
                        Sent via your portfolio contact form &bull; Reply directly to this email to respond to ${name}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
