import Image from "next/image";

export default function SpiralIcon() {
  return (
    <button 
      onClick={() => window.location.href = '/'}
      className="transition-all duration-300 transform hover:scale-110"
    >
      <div className=" relative w-8 h-8 rounded-full border-1 border-[#4a2f1b]  p-0.5 hover:border-white transition-colors duration-300">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={32}
          height={32}
          className="animate-spin-slow rounded-full"
        />
      </div>
    </button>
  );
} 