"use client";

import { useState } from "react";
import { useThemeStore } from "../../stateManager/theme";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { plainBg, borderColor, mode, altNameColor, navAltText, secondBgClassOpposite, altText } = useThemeStore();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: email, 
          email: email, 
          subject: "System Architecture Subscription", 
          message: `Someone just subscribed to your newsletter: ${email}`, 
        }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");

        
        setTimeout(() => {
          setStatus("idle");
        }, 3000);

      } else {
        setStatus("error");
       
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="w-full">
      <div className={`w-full xl:max-w-[496px] ${plainBg} rounded-lg px-6 h-[250px] sm:h-68 xl:h-[237px] flex flex-col justify-center`}>
        <div className="xl:max-w-[432px]">
          <p className={`${navAltText} xl:text-[20px] font-bold pb-7 transition-all duration-300`}>
            {status === "success" 
              ? "Thanks for subscribing!" 
              : "Architecture insights, system thinking, and product engineering, straight to your inbox"}
          </p>
          
          <form onSubmit={handleSubscribe}>
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className={`border ${borderColor} rounded-lg w-full py-2.5 px-3 outline-none
                  ${mode === "dark"
                    ? "text-white placeholder-[#FFFFFFB8]"
                    : `text-black placeholder-${altNameColor.replace("text-", "")}`
                  }
                `}
                disabled={status === "loading" || status === "success"}
              />
              <button 
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`md:w-[400px] xl:w-fit px-6 py-2.5 cursor-pointer rounded-lg ${altText} ${secondBgClassOpposite} disabled:opacity-50 transition-opacity`}
              >
                {status === "loading" ? "..." : status === "success" ? "Done" : "Subscribe"}
              </button>
            </div>
            {status === "error" && <p className="text-red-500 text-xs mt-2">Something went wrong. Try again.</p>}
          </form>
        </div>
      </div>
    </div>
  );
}