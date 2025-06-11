import Image from "next/image";
import { FaGamepad } from "react-icons/fa";
import { SiDota2, SiValorant, SiCounterstrike } from "react-icons/si";
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
  SiHostinger
} from "react-icons/si";

export default function About() {
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
      <div className="mb-2 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#c8a165]">Personal Information</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <tbody>
              <tr>
                <td className="py-2 px-2 sm:px-4 font-medium text-[#c8a165]">Name</td>
                <td className="py-2 px-2 sm:px-4 text-[#c8a165]">Kenneth Kieser T. Macabos</td>
              </tr>
              <tr>
                <td className="py-2 px-2 sm:px-4 font-medium text-[#c8a165]">Age</td>
                <td className="py-2 px-2 sm:px-4 text-[#c8a165]">22</td>
              </tr>
              <tr>
                <td className="py-2 px-2 sm:px-4 font-medium text-[#c8a165]">Location</td>
                <td className="py-2 px-2 sm:px-4 text-[#c8a165]">
                  <a
                    href="https://www.google.com/maps/place/14%C2%B010'00.6%22N+121%C2%B020'46.7%22E/@14.1668303,121.3456703,19z/data=!3m1!4b1!4m4!3m3!8m2!3d14.166829!4d121.346314?entry=ttu&g_ep=EgoyMDI1MDYwMi4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline transition-all duration-300 text-sm sm:text-base"
                  >
                    Purok 4 Blk 16 Lot 35 Brgy. Sto. Tomas Calauan, Laguna
                  </a>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 sm:px-4 font-medium text-[#c8a165]">Contact</td>
                <td className="py-2 px-2 sm:px-4 text-[#c8a165]">
                  <a
                    href="tel:+639361687804"
                    className="underline transition-all duration-300 text-sm sm:text-base"
                  >
                    +63 936 168 7804
                  </a>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 sm:px-4 font-medium text-[#c8a165]">Hobbies</td>
                <td className="py-2 px-2 sm:px-4 text-[#c8a165]">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-1 sm:gap-2 group">
                      <SiDota2 className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 group-hover:text-[#F9660E]" />
                      <span className="text-sm sm:text-base transition-transform duration-300 group-hover:scale-110">Dota 2</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 group">
                      <SiValorant className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 group-hover:text-[#FF4655]" />
                      <span className="text-sm sm:text-base transition-transform duration-300 group-hover:scale-110">Valorant</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 group">
                      <SiCounterstrike className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 group-hover:text-[#FFD700]" />
                      <span className="text-sm sm:text-base transition-transform duration-300 group-hover:scale-110">CS:GO</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 group">
                      <FaGamepad className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 group-hover:text-[#4CAF50]" />
                      <span className="text-sm sm:text-base transition-transform duration-300 group-hover:scale-110">Open World Games</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Experiences Section */}
        <div className="mt-8 sm:mt-10">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#c8a165]">Experiences</h3>
          <div className="space-y-6 sm:space-y-8 text-[#c8a165]">
            {/* Example Experience Item */}
            <div className="bg-[#1a1a1a]/50 p-4 rounded-lg border border-[#4a2f1b]/30">
              <h4 className="text-base sm:text-lg font-semibold mb-1">Junior Full-stack Software Developer</h4>
              <p className="text-sm sm:text-base text-[#c8a165]/80">MalvedaProperties & LeadsAgri | Feb 5 - March 27 2025</p>
              <ul className="list-disc list-inside mt-2 text-sm sm:text-base">
                <li>Worked as a On-the-Job Trainee ( Junior Full-stack Software
                   Developer ), <br /> collaborating closely with the
                   development team.</li>
                <li>Handled both frontend and backend development
                   tasks.</li>
                <li>Managed and maintained company websites for
                   MPDC and LAV.</li>
                <li>Ensured overall website performance and
                   responsiveness.</li>
                <li> Troubleshot issues and applied updates as needed.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

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