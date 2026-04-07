"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useThemeStore } from "@/app/stateManager/theme";
import Image from "next/image";
import ContactModal from "../HomeComponent/contactModal"; // your modal import

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const swiperImages = ["/images/vt.jpg", "/images/vs.jpg"];

const stackIcons = [
  { name: "JavaScript" },
  { name: "React" },
  { name: "Next.js" },
  { name: "Foundry" },
  { name: "Hardhat" },
  { name: "TypeScript" },
  { name: "Wagmi" },
  { name: "Tailwind" },
  { name: "Framer" },
  { name: "Notion" },
  { name: "Slack" },
];

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const { plainBg, textColor, altText, borderColor, navAltText, altButtonText, altNameColor } =
    useThemeStore();

  const [imgIndex, setImgIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    if (!isOpen) {
      setImgIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % swiperImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div
          key="about-modal"
          className="fixed inset-0 z-100 pt-6 flex items-center justify-center p-2 sm:p-4 md:p-10"
        >
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* MODAL */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`relative w-full max-w-5xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto rounded-4xl p-4 md:p-12 shadow-2xl ${plainBg} border ${borderColor} no-scrollbar`}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className={`absolute top-6 cursor-pointer right-3 md:right-6 p-2 rounded-full border ${borderColor} hover:bg-white/10 transition-colors z-50`}
            >
              <IoClose className={` text-xl md:text-2xl ${textColor}`} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-16 md:pt-10">
              {/* ABOUT */}
              <div
                className={`col-span-1 md:col-span-7 rounded-3xl p-5 border ${borderColor} bg-white/5`}
              >
                <h2 className={`text-2xl md:text-3xl font-bold mb-8 ${textColor}`}>
                  Who I am
                </h2>

                <div className="space-y-8">
                  <section>
                    <p className={`text-xs uppercase tracking-widest mb-4 ${altButtonText}`}>
                      My Story
                    </p>
                    <p className={` text-xs lg:text-base leading-relaxed ${navAltText}`}>
                      I am Arowolo Mutmahinat, a Front-End Developer and Smart Contract Developer. I specialize in building secure decentralized applications, writing robust smart contracts, and designing intuitive user interfaces that bridge the gap between complex blockchain systems and everyday users.
                    </p>
                  </section>

                  <section>
                    <p className={`text-xs uppercase tracking-widest mb-4 ${altButtonText}`}>
                      What I do now
                    </p>
                    <p className={`text-xs lg:text-base leading-relaxed ${navAltText}`}>
                      My work focuses on seamless Web3 integration, optimizing frontend performance, and end-to-end engineering. I am constantly exploring the bleeding edge of EVM-compatible ecosystems.
                    </p>
                  </section>
                </div>
              </div>

              {/* SIDE - What I do best / Stack */}
              <div className="col-span-1 md:col-span-5 space-y-6">
                <div className={`rounded-3xl p-4 border ${borderColor} bg-white/5`}>
                  <p className={`text-xs uppercase tracking-widest mb-4 ${altButtonText}`}>
                    What I do best
                  </p>
                  <h3 className={` text-base lg:text-xl font-bold mb-2 ${textColor}`}>
                    Full-Stack Product Engineering
                  </h3>
                  <p className={`text-xs lg:text-base  ${navAltText}`}>
                    Building product driven, scalable systems for businesses with a focus on architecture, performance, and end to end development.
                  </p>
                </div>

                {/* STACK */}
                <div
                  className={`rounded-3xl p-4 border ${borderColor} bg-white/5 overflow-hidden`}
                >
                  <h3 className={`text-xl font-bold mb-6 ${textColor}`}>Tech Stack</h3>
                  <div className="relative flex overflow-x-hidden">
                    <div className="animate-marquee whitespace-nowrap flex gap-4">
                      {[...stackIcons, ...stackIcons].map((icon, i) => (
                        <div
                          key={`marquee-item-${icon.name}-${i}`}
                          className={`w-14 h-14 shrink-0 rounded-2xl border ${borderColor} bg-white/10 flex items-center justify-center`}
                        >
                          <div className={`text-[10px] ${textColor}`}>{icon.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* EXPERIENCE */}
              <div
                className={`col-span-1 md:col-span-7 rounded-3xl p-4 border ${borderColor} bg-white/5`}
              >
                <p className={`text-xs uppercase tracking-widest mb-6 ${altButtonText}`}>Experience</p>
                <div className="space-y-4">
                  {[
                    { role: "Front-End & Smart Contract Developer", date: "Current" },
                    { role: "Web3 Frontend Engineer", date: "2022 - 2025" },
                    { role: "Frontend Developer & Designer", date: "2019 - 2022" },
                  ].map((job, i) => (
                    <div
                      key={`experience-row-${i}`}
                      className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                    >
                      <span className={`text-xs md:text-sm max-w-[150px] xxs:max-w-full md:max-w-[200px]   lg:max-w-full  ${textColor}`}>{job.role}</span>
                      <span className={`text-xs md:text-sm ${altButtonText}`}>{job.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* MEDIA + CTA */}
              <div className="md:col-span-5 grid md:grid-cols-1 lgmd:grid-cols-2 grid-cols-2 gap-4">
                {/* SWIPER */}
                <div
                  className={`rounded-3xl overflow-hidden border ${borderColor} relative h-[180px] bg-slate-800`}
                >
                  {swiperImages.map((src, i) => (
                    <div
                      key={`swiper-image-layer-${i}`}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        i === imgIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                    >
                      <img
                        src={src}
                       
                        sizes="(max-width: 768px) 50vw, 33vw"
                        alt="Project Showcase"
                        className="object-cover object-top"
                      />
                    </div>
                  ))}

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                    {swiperImages.map((_, i) => (
                      <div
                        key={`swiper-dot-${i}`}
                        className={`h-1 rounded-full transition-all ${
                          i === imgIndex ? "w-4 bg-white" : "w-1 bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div
                  className={`rounded-3xl p-3 border ${borderColor} bg-white/5 flex flex-col justify-between h-[180px]`}
                >
                  <p className={`font-bold text-base xs:text-lg leading-tight ${textColor}`}>
                    Have a project in mind?
                  </p>
                  <button
                    onClick={handleOpenModal}
                    className={`mt-4 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border ${borderColor} text-xs flex items-center justify-center gap-2 ${textColor} transition-all active:scale-95`}
                  >
                    Send a Message
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CONTACT MODAL */}
          {modalOpen && <ContactModal onClose={handleCloseModal} />}
        </div>
      )}

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </AnimatePresence>
  );
}
