"use client";
import { X, ExternalLink } from "lucide-react";
import { useThemeStore } from "@/app/stateManager/theme";

interface Project {
  id: string;
  title: string;
  image: string;
  stack: string[];
  insights: string[];
}

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { plainBg, textColor, secondBgClassOpposite, altText, borderColor } = useThemeStore();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-110 p-4 bg-black/70 backdrop-blur-md">
      {/* 1. Removed overflow-y-auto from this main container to prevent the whole modal from scrolling.
          2. Kept flex-col for mobile and md:flex-row for desktop.
      */}
      <div 
        className={`relative w-full max-w-4xl ${plainBg} rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] animate-in fade-in zoom-in duration-300`}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className={`absolute top-4 right-4 p-2  cursor-pointer  bg-[#AFACA1] hover:bg-[#141413] text-[#141413] hover:text-white rounded-full z-20 transition-colors`}
        >
          <X size={20} />
        </button>

        {/* Left: Image Section - Fixed height on mobile, auto on desktop */}
        <div className="w-full md:w-2/5 h-64 md:h-auto shrink-0">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {/* Right: Content Section - Added overflow-y-auto here so text scrolls under the image */}
        <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col overflow-y-auto">
          <h2 className={`text-3xl font-bold mb-4 ${textColor}`}>{project.title}</h2>
          
          {/* Detailed Insights */}
          <div className="space-y-4 mb-8">
            {project.insights.map((paragraph, i) => (
              <p key={i} className={`text-sm leading-relaxed ${textColor} opacity-80`}>
                {paragraph}
              </p>
            ))}
          </div>

          <div>
            <h2 className={`font-bold pb-4 text-sm uppercase tracking-wider ${textColor}`}>Stack Used</h2>   
            <div className="flex flex-wrap gap-2 mb-8">
              {project.stack.map((tech) => (
                <span 
                  key={tech} 
                  className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded border ${borderColor} ${textColor} opacity-70`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Button section - mt-auto keeps it at the bottom of the scrollable area */}
          <div className="mt-auto pt-6 border-t border-gray-700/10">
            <a 
              href={`/projects/${project.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 w-full md:w-fit px-8 py-3 ${secondBgClassOpposite} ${altText} rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg`}
            >
              <ExternalLink size={18} /> View Live Project
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}