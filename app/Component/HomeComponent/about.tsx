"use client";
import { useState } from "react";
import { useThemeStore } from "@/app/stateManager/theme";
import { MdArrowOutward } from "react-icons/md";
import AboutModal from "../HomeComponent/modal";

export default function About() {
  const { plainBg, altNameColor, altText, navAltText, textColor, borderColor } = useThemeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="w-full ">
      <div className={`${plainBg} h-[237px] md:h-[270px] xl:h-[237px] w-full xl:max-w-[409px] relative flex justify-center items-center rounded-xl overflow-hidden`}>
        <div className="xl:max-w-[360px] px-6">
          <h2 className={`${navAltText} text-lg pb-4 font-bold`}>ABOUT</h2>
          <p className={`${textColor} text-base leading-snug font-medium`}>
            Builds scalable, product driven systems with a strong focus on architecture, frontend performance, and end to end engineering.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className={`absolute bottom-3 right-6 border cursor-pointer ${borderColor} p-2 rounded-full group hover:bg-white hover:border-white transition-all duration-300 shadow-sm`}
            aria-label="Learn more about me"
          >
            <MdArrowOutward
              className={`text-xl ${altNameColor} group-hover:text-black transition-colors`}
            />
          </button>

          {showTooltip && (
            <div className={`absolute hidden xl:block bottom-[60px] right-4 px-3 py-2 bg-[#AFACA1] text-black text-sm rounded-lg whitespace-nowrap pointer-events-none z-10`}>
              Know more about me
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
            </div>
          )}
        </div>
      </div>

      <AboutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}