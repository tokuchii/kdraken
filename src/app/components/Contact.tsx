import Image from "next/image";

export default function Contact() {
    return (
      <div className="relative w-full animate-fade-in">
        {/* Floating logo bubbles */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Top left */}
          <div className="absolute top-[15%] left-[10%] w-8 h-8 opacity-10 animate-float-slow">
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

          {/* Top right */}
          <div className="absolute top-[20%] right-[15%] w-6 h-6 opacity-10 animate-float-medium">
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

          {/* Middle left */}
          <div className="absolute top-[45%] left-[5%] w-10 h-10 opacity-10 animate-float-fast">
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

          {/* Middle right */}
          <div className="absolute top-[50%] right-[8%] w-7 h-7 opacity-10 animate-float-slow">
            <div className="relative w-full h-full rounded-full border border-[#4a2f1b] p-0.5">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={28}
                height={28}
                className="animate-spin-slow rounded-full"
              />
            </div>
          </div>

          {/* Bottom left */}
          <div className="absolute bottom-[20%] left-[12%] w-9 h-9 opacity-10 animate-float-medium">
            <div className="relative w-full h-full rounded-full border border-[#4a2f1b] p-0.5">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={36}
                height={36}
                className="animate-spin-slow rounded-full"
              />
            </div>
          </div>

          {/* Bottom right */}
          <div className="absolute bottom-[15%] right-[10%] w-8 h-8 opacity-10 animate-float-fast">
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
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#c8a165] mb-4 md:mb-6 text-center">Contact Me</h2>
        <div className="max-w-md mx-auto">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-[#c8a165] mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 bg-[#1a1a1a]/50 border border-[#4a2f1b]/30 rounded-lg text-[#c8a165] focus:outline-none focus:border-[#c8a165] transition-colors duration-300"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[#c8a165] mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-[#1a1a1a]/50 border border-[#4a2f1b]/30 rounded-lg text-[#c8a165] focus:outline-none focus:border-[#c8a165] transition-colors duration-300"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-[#c8a165] mb-2">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 bg-[#1a1a1a]/50 border border-[#4a2f1b]/30 rounded-lg text-[#c8a165] focus:outline-none focus:border-[#c8a165] transition-colors duration-300"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#4a2f1b]/30 text-[#c8a165] rounded-lg hover:bg-[#4a2f1b]/50 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    );
  }