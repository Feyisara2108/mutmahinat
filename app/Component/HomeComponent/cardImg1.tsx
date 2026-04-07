"use client";
import { useState, useEffect, useRef } from "react";
import { Eye, ExternalLink } from "lucide-react";
import ProjectModal from "../HomeComponent/projectModal"; // Adjust path as needed

const projects = [
  { 
    id: "1", 
    title: "Hardware Logic", 
    image: "/images/card.jpg", 
    description: "Detailed description of the hardware logic and technical architecture.", 
    stack: ["Next.js", "Zustand", "Tailwind CSS", "Framer Motion"],
    insights: [
      "The core of this project involved designing a high-throughput logic gate simulator that could handle thousands of concurrent operations with sub-millisecond latency.",
      "We implemented a custom state management solution using Zustand to synchronize the hardware states across multiple dashboard views without unnecessary re-renders.",
      "By leveraging Next.js Server Components, we reduced the initial bundle size by 40%, ensuring the technical documentation loads instantly even on low-bandwidth connections."
    ]
  },
  { 
    id: "2", 
    title: "Branding Design", 
    image: "/images/card.jpg", 
    description: "A deep dive into professional brand strategy and visual identity systems.",
    stack: ["Illustrator", "React", "Three.js"],
    insights: [
      "Focused on professional brand strategy and visual identity systems.",
      "Explored how color theory and typography influence user trust across different digital touchpoints.",
      "Integrated 3D elements using Three.js to create an immersive brand experience."
    ]
  },
   { 
    id: "3", 
    title: "BrisBane Systems", 
    image: "/images/card.jpg", 
    description: "A deep dive into professional brand strategy and visual identity systems.",
    stack: ["Illustrator", "React", "Three.js"],
    insights: [
      "Focused on professional brand strategy and visual identity systems.",
      "Explored how color theory and typography influence user trust across different digital touchpoints.",
      "Integrated 3D elements using Three.js to create an immersive brand experience."
    ]
  }
];

export default function CardImg1() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal State
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const startSlider = () => {
    stopSlider();
    timerRef.current = setInterval(() => setIndex((prev) => (prev + 1) % projects.length), 4000);
  };

  const stopSlider = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    // Stop slider if hovered OR if modal is open
    if (!isHovered && !showModal) {
      startSlider();
    } else {
      stopSlider();
    }
    return () => stopSlider();
  }, [isHovered, showModal]);

  const current = projects[index];

  return (
    <>
      <div 
        className="group relative w-full h-[310px] md:h-[270px] xl:h-[237px] overflow-hidden rounded-lg shadow-md cursor-pointer"
        onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
        onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
        onClick={() => isTouchDevice && setIsHovered(prev => !prev)}
      >
        {/* Image Container */}
        <div className="relative w-full h-full overflow-hidden bg-slate-200">
          {projects.map((project, i) => (
            <div 
              key={project.id} 
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
              />
            </div>
          ))}
        </div>

        {/* Overlay Content */}
        <div 
          className={`absolute inset-0 bg-black/70 flex flex-col justify-end p-6 transition-transform duration-500 ease-out backdrop-blur-sm z-20 ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className={`transition-opacity duration-700 delay-100 ${isHovered ? "opacity-100" : "opacity-0"}`}>
            <h3 className="text-white font-bold text-xl mb-2">{current.title}</h3>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{current.description}</p>
            
            {/* Changed to Button for Modal Trigger */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className="inline-flex cursor-pointer items-center gap-2 px-5 py-2 bg-white text-slate-900 rounded-full text-sm font-bold hover:bg-blue-50 transition-colors shadow-lg"
            >
              <Eye size={16} /> View More Insight
            </button>
          </div>
        </div>

        {/* External Link Icon */}
        <div className={`absolute top-4 right-4 transition-opacity duration-300 text-white z-30 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <ExternalLink size={20} />
        </div>

        {/* Progress Indicators */}
        <div className="absolute top-4 left-4 flex gap-1 z-30">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              className={`h-1 rounded-full transition-all  duration-500 cursor-pointer ${
                i === index ? 'w-4 bg-white' : 'w-1 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal Render */}
      {showModal && (
        <ProjectModal 
          project={current} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
}