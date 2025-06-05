import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      title: "Zp Burger House",
      description: "Web-based ordering system with Augmented Reality",
      technologies: [
        "React.js",
        "Flutter",
        "Tailwind CSS",
        "Node.js",
        "Firebase",
        "Hostinger",
        "Three.js",
        "TypeScript",
        "Google Play Services for AR",
      ],
      imageSrc: "/images/zp-burger.jpg", // Add the image URL here
    },
    {
      title: "MPDC Website",
      description: "Luxury real estate website showcasing premium apartments and hotels across the Philippines",
      technologies: ["Vue.js", "Laravel", "PHP", "SMTP", "Hostinger", "Tailwind CSS"],
      imageSrc: "/images/mpdc-website.jpg", // Add the image URL here
    },
    {
      title: "LeadsAgri Website",
      description: "Website for an agricultural company showcasing products and services with Chat bot AI",
      technologies: ["Vue.js", "Laravel", "PHP", "SMTP", "Hostinger", "Tailwind CSS"],
      imageSrc: "/images/leadsagri-website.jpg", // Add the image URL here
    },
  ];

  return (
    <div className="relative w-full animate-fade-in">
      {/* Floating logo bubbles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating Logo Bubbles (no change here) */}
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

        {/* ... (Other Floating Bubbles) */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a]/50 p-4 rounded-lg border border-[#4a2f1b]/30 hover:border-[#c8a165] transition-colors duration-300 cursor-pointer relative pb-10"
            onClick={() => {
              if (project.title === "Zp Burger House") {
                window.open("https://zpcalauan.com", "_blank");
              } else if (project.title === "MPDC Website") {
                window.open("https://malvedaproperties.com", "_blank");
              }
            }}
          >
            <h3 className="text-xl font-semibold text-[#c8a165] mb-2">{project.title}</h3>
            <p className="text-[#c8a165] mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 text-sm bg-[#4a2f1b]/20 text-[#c8a165] rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Image under the description */}
            {project.imageSrc && (
              <div className="mb-4">
                <Image
                  src={project.imageSrc}
                  alt={`${project.title} image`}
                  width={400}
                  height={225}
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            )}

            {(project.title === "Zp Burger House" ||
              project.title === "MPDC Website" ||
              project.title === "LeadsAgri Website") && (
              <div className="absolute bottom-4 right-4">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full inline-flex items-center ${
                    project.title === "LeadsAgri Website"
                      ? "text-orange-300 bg-orange-300/10"
                      : "text-green-500 bg-green-500/10"
                  }`}
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {project.title === "LeadsAgri Website" ? "Ongoing" : "Completed"}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


