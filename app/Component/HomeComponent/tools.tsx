"use client";

import { useState } from "react";
import { useThemeStore } from "@/app/stateManager/theme";
import { FaFigma } from "react-icons/fa";
import { SiTailwindcss, SiFramer, SiSolidity, SiEthereum, SiJavascript, SiReact, SiNextdotjs, SiTypescript } from "react-icons/si";
import React from "react";

// =========================
// IconBox Component
// =========================
interface IconBoxProps {
  children: React.ReactNode;
  tooltip: string;
}

function IconBox({ children, tooltip }: IconBoxProps) {
  const { secondBgClassOpposite } = useThemeStore();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`rounded-lg w-10 h-10 sm:w-[60px] sm:h-[60px] ${secondBgClassOpposite} 
        flex items-center justify-center hover:border hover:border-neutral-400 
        transition-all cursor-pointer shrink-0`}
      >
        {children}
      </div>

      {showTooltip && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-[#AFACA1] text-black text-sm rounded-lg whitespace-nowrap pointer-events-none z-100 shadow-lg">
          {tooltip}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-[#AFACA1]"></div>
        </div>
      )}
    </div>
  );
}

// =========================
// Main Tools Component
// =========================
export default function Tools() {
  const { plainBg, altText, navAltText } = useThemeStore();

  const IconSet = () => (
    <>
      <IconBox tooltip="JavaScript"><SiJavascript className={`${altText} text-2xl sm:text-3xl`} /></IconBox>
      <IconBox tooltip="React"><SiReact className={`${altText} text-2xl sm:text-3xl`} /></IconBox>
      <IconBox tooltip="Next.js"><SiNextdotjs className={`${altText} text-2xl sm:text-3xl`} /></IconBox>
      <IconBox tooltip="Foundry"><SiSolidity className={`${altText} text-2xl sm:text-3xl`} /></IconBox>
      <IconBox tooltip="Hardhat"><SiEthereum className={`${altText} text-2xl sm:text-3xl`} /></IconBox>
      <IconBox tooltip="TypeScript"><SiTypescript className={`${altText} text-2xl sm:text-3xl`} /></IconBox>
      <IconBox tooltip="Wagmi"><div className={`${altText} text-[10px] sm:text-xs font-bold leading-tight`}>Wagmi</div></IconBox>
      <IconBox tooltip="Tailwind CSS"><SiTailwindcss className={`${altText} text-2xl sm:text-3xl`} /></IconBox>
      <IconBox tooltip="Framer"><SiFramer className={`${altText} text-2xl sm:text-3xl`} /></IconBox>
    </>
  );

  return (
    <div className="w-full xl:max-w-[353px]">
      <div
        className={`${plainBg} w-full xl:max-w-[353px] rounded-xl xl:w-[353px] 
        h-[233px] xl:h-[237px] flex flex-col justify-center items-center overflow-hidden`}
      >
        <div className="xl:w-full w-40 xxs:w-[250px] pt-12 sm:w-[300px] xsm:w-[320px] md:w-[340px] lg:w-[353px]">
          <h2 className={`${navAltText} text-lg pb-4 px-3 font-bold`}>Stacks</h2>

          <div className="px-1.5 w-full group pb-12">
            <div className="overflow-x-clip overflow-y-visible w-[calc(100%-12px)] mx-auto relative">
              
              <div className="flex gap-6 animate-marquee-fast whitespace-nowrap w-max">
                <div className="flex gap-6 items-center">
                  <IconSet />
                </div>
                <div className="flex gap-6 items-center">
                  <IconSet />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee-continuous {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee-fast {
          /* Changed from 6s to 3s for significantly faster speed */
          animation: marquee-continuous 3s linear infinite;
        }

        .group:hover .animate-marquee-fast {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
