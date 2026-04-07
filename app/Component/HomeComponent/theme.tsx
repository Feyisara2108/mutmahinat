"use client";

import { useState } from "react";
import { useThemeStore } from "@/app/stateManager/theme";
import { FaInstagram } from "react-icons/fa";
import { RiGlobalLine } from "react-icons/ri";
import { RiTwitterXFill } from "react-icons/ri";
import { Switch } from "@/components/ui/switch";

export default function Theme() {
  const { plainBg, textColor, nameColor, toggleTheme } = useThemeStore();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="w-full">
      <div
        className={` ${plainBg} w-full rounded-xl xl:max-w-[197px] h-[230px] xl:h-[237px] flex justify-center items-center`}
      >
        <div>
          {/* Example social icons using theme colors */}
       
          {/* Theme Switch connected to store toggle */}
          <div className="flex justify-center items-center relative">
            <div
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Switch
                id="theme-toggle"
                onCheckedChange={() => toggleTheme()}
              />
            </div>

            {showTooltip && (
              <div className="absolute hidden xl:block bottom-full mb-2 px-3 py-2 bg-[#156A80] text-white text-sm rounded-lg whitespace-nowrap pointer-events-none z-10">
                Toggle theme
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}