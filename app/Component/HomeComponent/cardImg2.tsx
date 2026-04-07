"use client";
import { useState, useEffect, useRef } from "react";
import { Eye } from "lucide-react";
import ProjectModal from "../HomeComponent/projectModal"; // Ensure path is correct

const projects = [
  { 
    id: "1", 
    title: "Project Alpha", 
    subtitle: "UI/UX • Optimization", 
    image: "/images/card.jpg", 
    description: "Detailed description of the hardware logic and technical architecture.",
    stack: ["Next.js", "Zustand", "Tailwind CSS"],
    insights: [
      "Focused on high-performance UI optimization and low-latency interactions.",
      "Developed a custom design system to maintain consistency across the entire hardware dashboard.",
      "Optimized assets leading to a 30% increase in initial page load speed."
    ]
  },
  { 
    id: "2", 
    title: "System Design", 
    subtitle: "Architecture • Scaling", 
    image: "/images/card.jpg", 
    description: "In-depth analysis of cloud-native infrastructure and distributed systems.",
    stack: ["Docker", "Kubernetes", "AWS"],
    insights: [
      "Designed a distributed system architecture capable of horizontal scaling.",
      "Implemented cloud-native monitoring tools to track system health in real-time.",
      "Successfully handled a traffic surge of 50k concurrent users during stress testing."
    ]
  },
  { 
    id: "3", 
    title: "Logic Core", 
    subtitle: "Hardware • Automation", 
    image: "/images/card.jpg", 
    description: "Developing custom logic controllers for automated manufacturing processes.",
    stack: ["Python", "C++", "MQTT"],
    insights: [
      "Automated low-level manufacturing processes using custom logic controllers.",
      "Reduced manual oversight requirements by 60% through proactive error handling.",
      "Integrated MQTT protocols for seamless machine-to-machine communication."
    ]
  }
];

export default function CardImg2() {
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
    // Pause slider if hovered OR if modal is open
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
            <h3 className="text-white font-bold text-xl mb-1">{current.title}</h3>
            <p className="text-blue-200 text-xs font-medium mb-3">{current.subtitle}</p>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{current.description}</p>
            
            {/* Button trigger for Modal */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className="inline-flex items-center cursor-pointer gap-2 px-5 py-2 bg-white text-slate-900 rounded-full text-sm font-bold hover:bg-blue-50 transition-colors shadow-lg"
            >
              <Eye size={16} /> View More Insight
            </button>
          </div>
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
              className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                i === index ? 'w-4 bg-white' : 'w-1 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Render Modal */}
      {showModal && (
        <ProjectModal 
          project={current} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
}