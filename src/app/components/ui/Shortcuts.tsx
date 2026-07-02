"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TYPING_SENTENCES = [
  "Debugging is like being a detective in a crime movie where you are also the murderer",
  "The best code is no code at all, every line of code is a potential bug waiting to happen",
  "First solve the problem then write the code, the experience is the teacher of all things",
  "Talk is cheap show me the code and I will tell you if it works or not in production",
  "Premature optimization is the root of all evil in computer science and programming",
  "Any fool can write code that a computer can understand, good programmers write human readable",
  "The most dangerous phrase in engineering is we have always done it this way so it must be right",
  "Programming is not about typing it is about thinking and solving complex problems daily",
  "Before software can be reusable it first has to be usable and well designed from the start",
  "Simplicity is the soul of efficiency in software development and engineering design work",
];

const SUGGESTIONS = [
  "What are Kenneth's skills?",
  "Tell me about his projects",
  "What experience does he have?",
  "How can I contact him?",
  "Where did he study?",
];

const RESPONSES: Record<string, string> = {
  skills: "Kenneth works with JavaScript, PHP, SQL, React, Vue, Next.js, Node.js, Express, Laravel, Tailwind CSS, MySQL, Firebase, and MongoDB.",
  projects: "Key projects include Farmex (agriculture platform), Leads (lead management), MPDC (property management), Oasis Gym (fitness platform), and his portfolio site.",
  experience: "Kenneth has experience as a Junior Blockchain Developer at LeadsAgriventures and Junior Software Developer at Malveda Properties, plus OJT and SPES trainee roles.",
  contact: "You can reach Kenneth at keisermacabos@gmail.com or +63 936 168 7804. LinkedIn, GitHub, and social links are also available.",
  education: "Kenneth is pursuing a BS in Information Technology at Laguna University (2020–2025).",
};

function getResponse(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack")) return RESPONSES.skills;
  if (lower.includes("project")) return RESPONSES.projects;
  if (lower.includes("experience") || lower.includes("work")) return RESPONSES.experience;
  if (lower.includes("contact") || lower.includes("email") || lower.includes("reach")) return RESPONSES.contact;
  if (lower.includes("education") || lower.includes("university") || lower.includes("school")) return RESPONSES.education;
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) return "Hello! Feel free to ask about Kenneth's skills, projects, experience, or how to contact him.";
  return "I can help with info about Kenneth's skills, projects, experience, education, or contact details. Try asking about one of those!";
}

type Phase =
  | "input"
  | "thinking"
  | "analyzing"
  | "before"
  | "location"
  | "ip"
  | "isp"
  | "coordinates"
  | "device"
  | "browserInfo"
  | "timezone"
  | "network"
  | "privacy1"
  | "privacy2"
  | "privacy3"
  | "asFor"
  | "final";

interface EnrichedInfo {
  ip: string;
  city: string;
  country: string;
  region: string;
  org: string;
  latitude: number;
  longitude: number;
  timezone: string;
  os: string;
  browser: string;
  browserVersion: string;
  language: string;
  cores: number;
  memory: number;
  networkType: string;
  localTime: string;
}

function FadeText({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Spinner({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="mt-1 w-5 h-5 rounded-full border-2 border-text-2/30 border-t-text-2 animate-spin shrink-0"
    />
  );
}

function askQuestion(
  enriched: EnrichedInfo,
  setPhase: (p: Phase) => void,
  userText: string,
  onFinal: () => void
) {
  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

  (async () => {
    setPhase("thinking");
    await wait(2200);

    setPhase("analyzing");
    await wait(2600);

    setPhase("before");
    await wait(2400);

    setPhase("location");
    await wait(3000);

    setPhase("ip");
    await wait(2800);

    setPhase("isp");
    await wait(2800);

    setPhase("coordinates");
    await wait(2800);

    setPhase("device");
    await wait(2800);

    setPhase("browserInfo");
    await wait(2800);

    setPhase("timezone");
    await wait(2800);

    setPhase("network");
    await wait(2800);

    setPhase("privacy1");
    await wait(3200);

    setPhase("privacy2");
    await wait(3200);

    setPhase("privacy3");
    await wait(3400);

    setPhase("asFor");
    await wait(2600);

    setPhase("final");
    onFinal();
  })();
}

const IP_APIS = [
  { url: "https://ipwho.is/", parse: (d: Record<string, unknown>) => ({
    ip: d.ip as string || "Unknown",
    city: (d.city as string) || "Unknown",
    country: (d.country as Record<string, unknown>)?.name as string || "",
    region: (d.region as string) || "",
    org: (d.connection as Record<string, unknown>)?.isp as string || "",
    latitude: d.latitude as number || 0,
    longitude: d.longitude as number || 0,
    timezone: (d.timezone as Record<string, unknown>)?.id as string || "",
  })},
  { url: "https://api.ipify.org?format=json", parse: (d: Record<string, unknown>) => ({
    ip: d.ip as string || "Unknown",
    city: "Unknown",
    country: "",
    region: "",
    org: "",
    latitude: 0,
    longitude: 0,
    timezone: "",
  })},
];

async function fetchIpInfo(): Promise<Partial<EnrichedInfo>> {
  for (const api of IP_APIS) {
    try {
      const res = await fetch(api.url, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const data = await res.json();
      const parsed = api.parse(data);
      if (parsed.ip && parsed.ip !== "Unknown") {
        const tz = parsed.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
        const now = new Date();
        const localTime = now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: tz,
        });
        return { ...parsed, timezone: tz, localTime };
      }
    } catch {
      continue;
    }
  }
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const now = new Date();
  const localTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: tz,
  });
  return { ip: "Hidden", city: "Unknown", country: "", timezone: tz, localTime };
}

function getBrowserInfo() {
  const ua = navigator.userAgent;
  let os = "Unknown OS";
  if (ua.includes("Win")) os = "Windows";
  else if (ua.includes("Mac")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iOS")) os = "iOS";

  let browser = "Unknown Browser";
  let browserVersion = "";
  if (ua.includes("Chrome") && !ua.includes("Edg")) {
    browser = "Chrome";
    const m = ua.match(/Chrome\/([\d.]+)/);
    browserVersion = m ? m[1].split(".")[0] : "";
  } else if (ua.includes("Safari") && !ua.includes("Chrome")) {
    browser = "Safari";
    const m = ua.match(/Version\/([\d.]+)/);
    browserVersion = m ? m[1].split(".")[0] : "";
  } else if (ua.includes("Firefox")) {
    browser = "Firefox";
    const m = ua.match(/Firefox\/([\d.]+)/);
    browserVersion = m ? m[1].split(".")[0] : "";
  } else if (ua.includes("Edg")) {
    browser = "Edge";
    const m = ua.match(/Edg\/([\d.]+)/);
    browserVersion = m ? m[1].split(".")[0] : "";
  }

  const cores = navigator.hardwareConcurrency || 0;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 0;

  let networkType = "unknown";
  const conn = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
  if (conn?.effectiveType) {
    networkType = conn.effectiveType;
  }

  return { os, browser, browserVersion, cores, memory, networkType, language: navigator.language };
}

function AskModal({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<Phase>("input");
  const [userText, setUserText] = useState("");
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [info, setInfo] = useState<EnrichedInfo>({
    ip: "Loading...",
    city: "Detecting...",
    country: "",
    region: "",
    org: "",
    latitude: 0,
    longitude: 0,
    timezone: "",
    os: "Unknown OS",
    browser: "Unknown Browser",
    browserVersion: "",
    language: navigator.language,
    cores: 0,
    memory: 0,
    networkType: "unknown",
    localTime: "",
  });
  const infoRef = useRef<EnrichedInfo>(info);

  useEffect(() => {
    inputRef.current?.focus();

    const browserData = getBrowserInfo();
    setInfo((prev) => {
      const updated = { ...prev, ...browserData };
      infoRef.current = updated;
      return updated;
    });

    fetchIpInfo().then((ipData) => {
      setInfo((prev) => {
        const updated = { ...prev, ...ipData };
        infoRef.current = updated;
        return updated;
      });
    }).catch(() => {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const now = new Date();
      const localTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: tz,
      });
      setInfo((prev) => {
        const updated = { ...prev, timezone: tz, localTime };
        infoRef.current = updated;
        return updated;
      });
    });
  }, []);

  const handleSend = async () => {
    const q = input.trim();
    if (!q || phase !== "input") return;
    setUserText(q);
    setInput("");
    await new Promise((r) => setTimeout(r, 300));
    askQuestion(infoRef.current, setPhase, q, () => {});
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const renderPhase = () => {
    switch (phase) {
      case "input":
        return (
          <FadeText>
            <h2 className="font-mono text-[clamp(1.9rem,5.5vw,3.4rem)] text-text-1 tracking-tight mb-6">
              what do you want to ask?
            </h2>
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-transparent text-[clamp(1.05rem,3vw,1.5rem)] text-text-1 placeholder:text-text-2/30 focus:outline-none focus:ring-0 border-none shadow-none appearance-none font-mono caret-text-1 [&:focus-visible]:outline-none"
                placeholder=""
                style={{ boxShadow: "none", outline: "none", border: "none", WebkitAppearance: "none" }}
              />
            </div>
          </FadeText>
        );

      case "thinking":
        return (
          <FadeText className="flex items-start gap-3">
            <Spinner delay={0.1} />
            <h2 className="font-mono text-[clamp(1.25rem,3.4vw,1.95rem)] text-text-2 tracking-tight">
              thinking...
            </h2>
          </FadeText>
        );

      case "analyzing":
        return (
          <FadeText className="flex items-start gap-3">
            <Spinner delay={0.1} />
            <h2 className="font-mono text-[clamp(1.25rem,3.4vw,1.95rem)] text-text-2 tracking-tight">
              analyzing...
            </h2>
          </FadeText>
        );

      case "before":
        return (
          <FadeText delay={0.15}>
            <h2 className="font-mono text-[clamp(1.25rem,3.4vw,1.95rem)] text-text-1 tracking-tight">
              before i answer
            </h2>
          </FadeText>
        );

      case "location":
        return (
          <FadeText delay={0.2}>
            <h2 className="font-mono text-[clamp(1.25rem,3.4vw,1.95rem)] text-text-1 tracking-tight leading-snug">
              you are currently in {info.city}{info.region ? `, ${info.region}` : ""}{info.country ? `, ${info.country}` : ""}
            </h2>
          </FadeText>
        );

      case "ip":
        return (
          <FadeText delay={0.2}>
            <h2 className="font-mono text-[clamp(1.25rem,3.4vw,1.95rem)] text-text-1 tracking-tight leading-snug">
              your public ip address is {info.ip}
            </h2>
          </FadeText>
        );

      case "isp":
        return (
          <FadeText delay={0.2}>
            <h2 className="font-mono text-[clamp(1.25rem,3.4vw,1.95rem)] text-text-1 tracking-tight leading-snug">
              {info.org
                ? `you are connected through ${info.org.replace(/^AS\d+\s*/, "")}`
                : "your isp information is unavailable"}
            </h2>
          </FadeText>
        );

      case "coordinates":
        return (
          <FadeText delay={0.2}>
            <h2 className="font-mono text-[clamp(1.25rem,3.4vw,1.95rem)] text-text-1 tracking-tight leading-snug">
              your approximate coordinates are around {info.latitude.toFixed(2)}, {info.longitude.toFixed(2)}
            </h2>
          </FadeText>
        );

      case "device":
        return (
          <FadeText delay={0.2}>
            <h2 className="font-mono text-[clamp(1.25rem,3.4vw,1.95rem)] text-text-1 tracking-tight leading-snug">
              you are on a {info.os.toLowerCase()} device
              {info.cores > 0 ? ` with ${info.cores} processor cores` : ""}
              {info.memory > 0 ? ` and ${info.memory}gb of memory` : ""}
            </h2>
          </FadeText>
        );

      case "browserInfo":
        return (
          <FadeText delay={0.2}>
            <h2 className="font-mono text-[clamp(1.25rem,3.4vw,1.95rem)] text-text-1 tracking-tight leading-snug">
              you are browsing with {info.browser}{info.browserVersion ? ` ${info.browserVersion}` : ""} set to {info.language}
            </h2>
          </FadeText>
        );

      case "timezone":
        return (
          <FadeText delay={0.2}>
            <h2 className="font-mono text-[clamp(1.25rem,3.4vw,1.95rem)] text-text-1 tracking-tight leading-snug">
              your timezone is {info.timezone.toLowerCase().replace("_", "/")} and it is around {info.localTime} where you are
            </h2>
          </FadeText>
        );

      case "network":
        return (
          <FadeText delay={0.2}>
            <h2 className="font-mono text-[clamp(1.25rem,3.4vw,1.95rem)] text-text-1 tracking-tight leading-snug">
              you are on a {info.networkType === "unknown" ? "unknown" : info.networkType} connection
            </h2>
          </FadeText>
        );

      case "privacy1":
        return (
          <FadeText delay={0.25}>
            <h2 className="font-mono text-[clamp(1.25rem,3.4vw,1.95rem)] text-text-1 tracking-tight leading-snug">
              none of this needed your permission
            </h2>
          </FadeText>
        );

      case "privacy2":
        return (
          <FadeText delay={0.25}>
            <h2 className="font-mono text-[clamp(1.25rem,3.4vw,1.95rem)] text-text-1 tracking-tight leading-snug">
              your browser shares it with every website you open, automatically
            </h2>
          </FadeText>
        );

      case "privacy3":
        return (
          <FadeText delay={0.25}>
            <h2 className="font-mono text-[clamp(1.25rem,3.4vw,1.95rem)] text-text-1 tracking-tight leading-snug">
              so be mindful of what you click, and who you trust online
            </h2>
          </FadeText>
        );

      case "asFor":
        return (
          <FadeText delay={0.15}>
            <h2 className="font-mono text-[clamp(1.25rem,3.4vw,1.95rem)] text-text-1 tracking-tight">
              as for your question
            </h2>
          </FadeText>
        );

      case "final":
        return (
          <FadeText delay={0.2}>
            <h2 className="font-mono text-[clamp(1.25rem,3.4vw,1.95rem)] text-text-1 tracking-tight">
              i don&apos;t want to waste tokens on that, search for it yourself :)
            </h2>
          </FadeText>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[60]" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.99 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 flex flex-col h-full px-6 sm:px-12 lg:px-24 pt-6 max-w-4xl w-full items-start justify-center"
      >
        {/* User question - fixed at left center */}
        <div className="absolute left-6 sm:left-12 lg:left-24 top-1/2 -translate-y-1/2">
          {userText && phase !== "input" && (
            <FadeText>
              <span className="inline-block px-3.5 py-2 rounded-2xl rounded-bl-sm bg-border/60 text-text-1 font-mono text-[15px]">
                {userText}
              </span>
            </FadeText>
          )}
        </div>
        {/* Phase content - positioned below center */}
        <div className="mt-16">
          <AnimatePresence mode="wait">
            <motion.div key={phase}>
              {renderPhase()}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

function TypingModal({ onClose }: { onClose: () => void }) {
  const [sentence] = useState(() => TYPING_SENTENCES[Math.floor(Math.random() * TYPING_SENTENCES.length)]);
  const [typed, setTyped] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [raw, setRaw] = useState(0);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    inputRef.current?.focus();

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [onClose]);

  const startTimer = () => {
    if (timerRef.current) return;
    const now = Date.now();
    setStartTime(now);
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - now;
      const timeSec = elapsed / 1000;
      setElapsed(Math.floor(timeSec));
      // Show WPM from first character after 0.5s
      if (typed.length > 0 && timeSec > 0.5) {
        const minutes = timeSec / 60;
        const words = typed.length / 5;
        setWpm(Math.round(words / minutes));
      }
    }, 100);
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      reset();
      return;
    }
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key === " " ? "space" : null;
    if (key) setActiveKey(key);
  };

  const handleKeyUp = () => {
    setActiveKey(null);
  };

  const handleInput = (value: string) => {
    if (finished) return;
    if (!startTime && value.length > 0) startTimer();
    setTyped(value);
    setRaw(value.length);

    // Show WPM from first character after 0.5s for stability
    if (startTime && value.length > 0) {
      const timeSec = (Date.now() - startTime) / 1000;
      if (timeSec > 0.5) {
        const minutes = timeSec / 60;
        const words = value.length / 5;
        setWpm(Math.round(words / minutes));
      }
    }

    if (value.length === sentence.length) {
      if (timerRef.current) clearInterval(timerRef.current);
      const timeSec = startTime ? (Date.now() - startTime) / 1000 : 0;
      const minutes = timeSec / 60;
      const words = sentence.length / 5;
      setWpm(minutes > 0 ? Math.round(words / minutes) : 0);
      let correct = 0;
      for (let i = 0; i < sentence.length; i++) {
        if (value[i] === sentence[i]) correct++;
      }
      setAccuracy(Math.round((correct / sentence.length) * 100));
      setFinished(true);
    }
  };

  const reset = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTyped("");
    setStartTime(null);
    setElapsed(0);
    setFinished(false);
    setWpm(0);
    setAccuracy(100);
    setRaw(0);
    setActiveKey(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const KEYBOARD_ROWS = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  return (
    <div className="fixed inset-0 z-[60]" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center"
      >
        {!finished ? (
          <>
            {/* Stats */}
            <div className="flex items-center gap-12 mb-10">
              <div className="text-center">
                <div className="font-mono text-2xl font-bold text-text-1">{wpm}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-text-2 mt-0.5">WPM</div>
              </div>
              <div className="text-center">
                <div className="font-mono text-2xl font-bold text-text-1">{accuracy}<span className="text-sm font-normal">%</span></div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-text-2 mt-0.5">ACC</div>
              </div>
              <div className="text-center">
                <div className="font-mono text-2xl font-bold text-text-1">{elapsed}<span className="text-sm font-normal">s</span></div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-text-2 mt-0.5">TIME</div>
              </div>
            </div>

            {/* Text display */}
            <div className="w-full text-center mb-8">
              <p className="font-mono text-xl sm:text-2xl leading-relaxed tracking-wide">
                {sentence.split("").map((char, i) => {
                  let color = "text-text-2/30";
                  if (i < typed.length) {
                    color = typed[i] === char ? "text-text-1" : "text-red-500";
                  } else if (i === typed.length) {
                    color = "text-text-1";
                  }
                  return (
                    <span key={i} className={`${color} ${i === typed.length ? "border-l-2 border-text-1 ml-[-1px]" : ""} transition-colors duration-100`}>
                      {char}
                    </span>
                  );
                })}
              </p>
            </div>

            {/* Virtual keyboard */}
            <div className="flex flex-col items-center gap-2 mb-8">
              {KEYBOARD_ROWS.map((row, ri) => (
                <div key={ri} className="flex gap-2" style={{ paddingLeft: ri === 1 ? "16px" : ri === 2 ? "40px" : 0 }}>
                  {row.map((key) => (
                    <div
                      key={key}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-mono transition-all duration-100 ${
                        activeKey === key
                          ? "bg-accent text-background border-accent scale-95"
                          : "bg-background border-border text-text-2"
                      }`}
                    >
                      {key}
                    </div>
                  ))}
                </div>
              ))}
              <div className={`w-64 h-10 flex items-center justify-center rounded-lg border text-[11px] font-mono uppercase tracking-wider transition-all duration-100 ${
                activeKey === "space"
                  ? "bg-accent text-background border-accent scale-95"
                  : "bg-background border-border text-text-2"
              }`}>
                SPACE
              </div>
            </div>

            {/* Controls under keyboard */}
            <div className="flex items-center gap-4 text-[12px] text-text-2 mt-4">
              <span className="inline-flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded border border-border bg-background font-mono text-[10px]">tab</kbd>
                <span>restart</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded border border-border bg-background font-mono text-[10px]">esc</kbd>
                <span>close</span>
              </span>
            </div>
          </>
        ) : (
          /* Results screen */
          <div className="flex flex-col items-center">
            <div className="font-mono text-[80px] sm:text-[100px] font-bold text-text-1 leading-none tracking-tight">
              {wpm}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-text-2 mt-2 mb-8">
              WORDS PER MINUTE
            </div>

            <div className="flex items-center gap-10 mb-8">
              <div className="text-center">
                <div className="font-mono text-xl font-bold text-text-1">{accuracy}<span className="text-xs font-normal">%</span></div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-text-2 mt-1">ACCURACY</div>
              </div>
              <div className="text-center">
                <div className="font-mono text-xl font-bold text-text-1">{raw}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-text-2 mt-1">RAW</div>
              </div>
              <div className="text-center">
                <div className="font-mono text-xl font-bold text-text-1">{elapsed.toFixed(1)}<span className="text-xs font-normal">s</span></div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-text-2 mt-1">TIME</div>
              </div>
            </div>

            <p className="text-[13px] text-text-2 mb-6 font-mono">
              {wpm >= 100
                ? `× you're faster than kdraken · ${wpm} wpm`
                : `× you didn't beat kdraken · 100 wpm`}
            </p>

            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background rounded-full text-[13px] font-medium hover:opacity-90 transition-opacity"
            >
              <RotateCcw size={14} /> try again
            </button>
          </div>
        )}

        {/* Hidden input */}
        <input
          ref={inputRef}
          type="text"
          value={typed}
          onChange={(e) => handleInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          className="absolute opacity-0 w-0 h-0"
          autoComplete="off"
          spellCheck={false}
          autoFocus
          onFocus={() => inputRef.current?.focus()}
        />
      </motion.div>
    </div>
  );
}

export default function Shortcuts() {
  const [askOpen, setAskOpen] = useState(false);
  const [typingOpen, setTypingOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.altKey && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (typingOpen) {
        setTypingOpen(false);
      } else {
        setAskOpen((prev) => !prev);
      }
    }
    if (e.altKey && e.key.toLowerCase() === "j") {
      e.preventDefault();
      if (askOpen) {
        setAskOpen(false);
      } else {
        setTypingOpen((prev) => !prev);
      }
    }
  }, [askOpen, typingOpen]);

  useEffect(() => {
    const onAsk = () => { setAskOpen(true); setTypingOpen(false); };
    const onTyping = () => { setTypingOpen(true); setAskOpen(false); };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("shortcut:ask", onAsk);
    window.addEventListener("shortcut:typing", onTyping);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("shortcut:ask", onAsk);
      window.removeEventListener("shortcut:typing", onTyping);
    };
  }, [handleKeyDown]);

  return (
    <>
      <AnimatePresence>
        {askOpen && <AskModal onClose={() => setAskOpen(false)} />}
        {typingOpen && <TypingModal onClose={() => setTypingOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
