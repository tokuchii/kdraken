import Image from "next/image";
import { useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiTailwindcss,
  SiAxios,
  SiNodedotjs,
  SiExpress,
  SiPhp,
  SiLaravel,
  SiMysql,
  SiFirebase,
  SiMongodb,
  SiVite,
  SiVercel,
  SiHostinger,
  SiAdobe,
  SiFigma,
} from "react-icons/si";

 
export default function About() {
  const [showExperiences, setShowExperiences] = useState(false);
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
      
<div className="mb-8 sm:mb-12">
  <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#c8a165] text-center">
    What I Offer
  </h3>
  <p className="text-sm sm:text-base text-[#c8a165]/90 text-center max-w-5xl mx-auto mb-8 sm:mb-10 leading-relaxed">
    I specialize in web development, crafting modern, interactive, and responsive websites 
    for businesses and individuals. From e-commerce platforms to dynamic web apps, 
    I bring ideas to life with creativity, performance, and attention to detail.
  </p>


  {/* Services Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
    <div className="bg-[#1a1a1a]/50 border border-[#4a2f1b]/30 rounded-lg p-4 flex flex-col items-center text-center hover:border-[#c8a165] transition-all duration-300">
      <SiReact className="w-10 h-10 mb-2 text-[#61DAFB]" />
      <h4 className="text-sm sm:text-base font-semibold text-[#c8a165] mb-1">Web Development</h4>
      <p className="text-xs sm:text-sm text-[#c8a165]/70">
        Modern, responsive websites and web apps using React, Vue, and Next.js.
      </p>
    </div>


     <div className="bg-[#1a1a1a]/50 border border-[#4a2f1b]/30 rounded-lg p-4 flex flex-col items-center text-center hover:border-[#c8a165] transition-all duration-300">
    <SiAdobe className="w-10 h-10 mb-2 text-[#FF0000]" />
    <h4 className="text-sm sm:text-base font-semibold text-[#c8a165] mb-1">Video Editing</h4>
    <p className="text-xs sm:text-sm text-[#c8a165]/70">
      Creating engaging video content, editing clips, and motion graphics.
    </p>
  </div>

  <div className="bg-[#1a1a1a]/50 border border-[#4a2f1b]/30 rounded-lg p-4 flex flex-col items-center text-center hover:border-[#c8a165] transition-all duration-300">
    <SiFigma className="w-10 h-10 mb-2 text-[#F24E1E]" />
    <h4 className="text-sm sm:text-base font-semibold text-[#c8a165] mb-1">Graphic Design</h4>
    <p className="text-xs sm:text-sm text-[#c8a165]/70">
      Designing visuals, illustrations, and branding materials.
    </p>
  </div>

    <div className="bg-[#1a1a1a]/50 border border-[#4a2f1b]/30 rounded-lg p-4 flex flex-col items-center text-center hover:border-[#c8a165] transition-all duration-300">
      <SiFirebase className="w-10 h-10 mb-2 text-[#FFCA28]" />
      <h4 className="text-sm sm:text-base font-semibold text-[#c8a165] mb-1">Backend & Cloud</h4>
      <p className="text-xs sm:text-sm text-[#c8a165]/70">
        Scalable backend systems with Firebase, Node.js, Laravel, and database management.
      </p>
    </div>
  </div>



</div>


<hr className="my-8 border-t-2 border-[#c8a165]" />

      <div className="space-y-4 text-[#c8a165]">
        <p className="text-lg sm:text-xl font-semibold mb-8 sm:mb-10 mt-8 sm:mt-10 text-center">
          Tech Stacks
        </p>
        <div className="rounded-lg overflow-hidden">
          <ul className="list-none space-y-6 sm:space-y-8">
            <li>
              <div className="flex flex-col items-center gap-3 sm:gap-4">

                <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
                  <div className="flex flex-col items-center gap-1 sm:gap-2 group">
                    <SiReact className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 group-hover:text-[#61DAFB] group-hover:scale-110" />
                    <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:scale-110">React</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 sm:gap-2 group">
                    <SiVuedotjs className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 group-hover:text-[#4FC08D] group-hover:scale-110" />
                    <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:scale-110">Vue</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 sm:gap-2 group">
                    <SiNextdotjs className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 group-hover:text-white group-hover:scale-110" />
                    <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:scale-110">Next.js</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 sm:gap-2 group">
                    <SiTailwindcss className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 group-hover:text-[#06B6D4] group-hover:scale-110" />
                    <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:scale-110">Tailwind</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 sm:gap-2 group">
                    <SiAxios className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 group-hover:text-[#5A29E4] group-hover:scale-110" />
                    <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:scale-110">Axios</span>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="flex flex-col items-center gap-3 sm:gap-4">

                <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
                  <div className="flex flex-col items-center gap-1 sm:gap-2 group">
                    <SiNodedotjs className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 group-hover:text-[#339933] group-hover:scale-110" />
                    <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:scale-110">Node.js</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 sm:gap-2 group">
                    <SiExpress className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 group-hover:text-[#000000] group-hover:scale-110" />
                    <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:scale-110">Express</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 sm:gap-2 group">
                    <SiPhp className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 group-hover:text-[#777BB4] group-hover:scale-110" />
                    <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:scale-110">PHP</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 sm:gap-2 group">
                    <SiLaravel className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 group-hover:text-[#FF2D20] group-hover:scale-110" />
                    <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:scale-110">Laravel</span>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="flex flex-col items-center gap-3 sm:gap-4">

                <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
                  <div className="flex flex-col items-center gap-1 sm:gap-2 group">
                    <SiMysql className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 group-hover:text-[#4479A1] group-hover:scale-110" />
                    <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:scale-110">MySQL</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 sm:gap-2 group">
                    <SiFirebase className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 group-hover:text-[#FFCA28] group-hover:scale-110" />
                    <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:scale-110">Firebase</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 sm:gap-2 group">
                    <SiMongodb className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 group-hover:text-[#47A248] group-hover:scale-110" />
                    <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:scale-110">MongoDB</span>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
                  <div className="flex flex-col items-center gap-1 sm:gap-2 group">
                    <SiVite className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 group-hover:text-[#646CFF] group-hover:scale-110" />
                    <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:scale-110">Vite</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 sm:gap-2 group">
                    <SiVercel className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 group-hover:text-[#000000] group-hover:scale-110" />
                    <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:scale-110">Vercel</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 sm:gap-2 group">
                    <SiHostinger className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 group-hover:text-[#2F71C5] group-hover:scale-110" />
                    <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:scale-110">Hostinger</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 sm:gap-2 group">
                    <SiFirebase className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 group-hover:text-[#FFCA28] group-hover:scale-110" />
                    <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:scale-110">Firebase</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 