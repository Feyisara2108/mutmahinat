"use client";
import { useState, useEffect, useRef } from "react";
import { Eye, ExternalLink } from "lucide-react";
import ProjectModal from "../HomeComponent/projectModal"; // Adjust path if necessary

const brandingProjects = [
  { 
    id: "branding-1", 
    title: "Visual Strategy", 
    image: "/images/card.jpg", 
    description: "Professional brand development including visual strategy, logo architecture, and digital identity.",
    stack: ["Adobe Suite", "Figma", "Strategy Mapping"],
    insights: [
      "Developed a comprehensive visual strategy that aligned the client's core values with modern digital aesthetic trends.",
      "Created a scalable logo architecture designed to maintain legibility across everything from favicons to large-scale physical signage.",
      "Established a digital identity system that improved cross-platform brand recognition by over 50% in the first quarter."
    ]
  },
  { 
    id: "branding-2", 
    title: "Corporate Identity", 
    image: "/images/card.jpg", 
    description: "Creating cohesive brand ecosystems for enterprise-level technology firms.",
    stack: ["Brand Guidelines", "UI/UX", "Typography"],
    insights: [
      "Engineered a cohesive brand ecosystem that unified five separate product lines under a single enterprise-level identity.",
      "Developed extensive brand guidelines that standardized internal and external communication for a global workforce of 2,000+ employees.",
      "Redesigned the corporate typography system to enhance accessibility and readability in complex technical documentation."
    ]
  },
  { 
    id: "branding-3", 
    title: "Digital Presence", 
    image: "/images/card.jpg", 
    description: "Redefining how brands interact with users across modern digital touchpoints.",
    stack: ["Next.js", "Tailwind CSS", "Interaction Design"],
    insights: [
      "Redefined the brand's interaction model by implementing intuitive user journeys across all modern digital touchpoints.",
      "Leveraged Next.js and Tailwind CSS to build a high-performance brand portal that serves as the central hub for user engagement.",
      "Integrated advanced interaction design principles to create an immersive digital experience that increased user retention rates."
    ]
  }
];

export default function Branding() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startSlider = () => {
    stopSlider();
    timerRef.current = setInterval(() => setIndex((prev) => (prev + 1) % brandingProjects.length), 4500);
  };

  const stopSlider = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    // Pause slider if hovered OR if modal is open
    if (!isHovered && !showModal) startSlider();
    else stopSlider();
    return () => stopSlider();
  }, [isHovered, showModal]);

  const current = brandingProjects[index];

  const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  return (
    <>
      <div
        className="group relative w-full xl:max-w-[390px] h-[310px] md:h-[270px] xl:h-[237px] overflow-hidden rounded-lg shadow-md cursor-pointer"
        onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
        onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
        onClick={() => isTouchDevice && setIsHovered(prev => !prev)}
      >
        {/* Slider Images */}
        <div className="relative w-full h-full overflow-hidden bg-slate-200">
          {brandingProjects.map((project, i) => (
            <div key={project.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
              <img src={project.image} alt={project.title} className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110" />
            </div>
          ))}
        </div>

        {/* Hover Overlay Content */}
        <div className={`absolute inset-0 bg-black/70 flex flex-col justify-end p-6 transition-transform duration-500 ease-out backdrop-blur-sm z-20 ${isHovered ? "translate-y-0" : "translate-y-full"}`}>
          <div className={`opacity-0 transition-opacity duration-700 delay-100 ${isHovered ? "opacity-100" : ""}`}>
            <h3 className="text-white font-bold text-xl mb-2">{current.title}</h3>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{current.description}</p>
            
            {/* Modal Trigger Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className="flex items-center gap-2 px-5  cursor-pointer py-2 bg-white text-slate-900 rounded-full text-sm font-bold hover:bg-blue-50 transition-colors shadow-lg w-fit"
            >
              <Eye size={16} /> View More Insight
            </button>
          </div>
        </div>

        {/* Top Icons */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white z-30">
          <ExternalLink size={20} />
        </div>

        <div className="absolute top-4 left-4 flex gap-1 z-30">
          {brandingProjects.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-4 bg-white' : 'w-1 bg-white/40'}`} />
          ))}
        </div>
      </div>

      {/* Render the shared ProjectModal */}
      {showModal && (
        <ProjectModal 
          project={current} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
}