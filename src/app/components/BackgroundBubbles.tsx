import Image from "next/image";

export default function BackgroundBubbles() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Existing background shapes */}
      <div className="absolute top-1/4 left-1/3 w-64 md:w-96 h-64 md:h-96 bg-[#4a2f1b] opacity-20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-56 md:w-80 h-56 md:h-80 bg-[#2c4a1b] opacity-20 rounded-full blur-2xl animate-float-medium" />
      <div className="absolute top-10 right-10 w-32 md:w-40 h-32 md:h-40 bg-[#1b2f4a] opacity-10 rounded-full blur-2xl animate-float-fast" />

      {/* Floating logo bubbles */}
      <div className="absolute top-1/4 left-1/4 w-12 h-12 opacity-10 animate-float-slow">
        <div className="relative w-full h-full rounded-full border border-[#4a2f1b] p-0.5">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={48}
            height={48}
            className="animate-spin-slow rounded-full"
          />
        </div>
      </div>

      <div className="absolute bottom-1/3 right-1/3 w-8 h-8 opacity-10 animate-float-medium">
        <div className="relative w-full h-full rounded-full border border-[#4a2f1b] p-0.5">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="animate-spin-slow rounded-full"
          />
        </div>
      </div>

      <div className="absolute top-2/3 left-1/3 w-10 h-10 opacity-10 animate-float-fast">
        <div className="relative w-full h-full rounded-full border border-[#4a2f1b] p-0.5">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="animate-spin-slow rounded-full"
          />
        </div>
      </div>

      <div className="absolute top-1/3 right-1/4 w-6 h-6 opacity-10 animate-float-slow">
        <div className="relative w-full h-full rounded-full border border-[#4a2f1b] p-0.5">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={24}
            height={24}
            className="animate-spin-slow rounded-full"
          />
        </div>
      </div>
    </div>
  );
} 