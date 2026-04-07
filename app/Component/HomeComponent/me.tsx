"use client";
import { useState, useEffect } from "react";
import { useThemeStore } from "@/app/stateManager/theme";

// Define your images here
const myImages = [
  "/images/vt.jpg",
  "/images/vs.jpg"
];

export default function Me() {
  const { plainBg } = useThemeStore();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Changes image every 4 seconds
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % myImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full xl:max-w-[273px]">
      <div className="w-full h-[313px] xs:h-[271px] lg:h-[370px] xl:h-[237px] rounded-xl relative overflow-hidden">
        {myImages.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
       <img
  src={src}
  alt={`Slide ${i + 1}`}
  className="object-cover object-[center_-20px] md:object-[center_-40px] xl:object-[center_-20px] w-full h-full rounded-lg"
/>
          </div>
        ))}

        {/* Optional: Subtle indicators at the bottom */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-20">
          {myImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                i === index ? "w-4 bg-white" : "w-1 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}