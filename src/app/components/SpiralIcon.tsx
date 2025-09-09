import Image from "next/image";

type SpiralIconProps = {
  onClick?: () => void;
};

export default function SpiralIcon({ onClick }: SpiralIconProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="cursor-pointer transition-all duration-300 transform hover:scale-110"
    >
      <div className="relative w-8 h-8 rounded-full border border-[#4a2f1b] p-0.5 hover:border-white transition-colors duration-300">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={32}
          height={32}
          className="animate-spin-slow rounded-full"
        />
      </div>
    </div>
  );
}
