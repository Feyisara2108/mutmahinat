"use client";

import { useState } from "react";
import { useThemeStore } from "@/app/stateManager/theme";

export default function ContactModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const { plainBg, textColor, secondBgClassOpposite, navAltText, altText } = useThemeStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (response.ok) {
        setStatus("success");
        setTimeout(() => onClose(), 2000); // Close after 2 seconds on success
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const inputClasses = `p-2 rounded border ${navAltText} ${plainBg} focus:outline-none focus:ring-2 focus:ring-blue-400`;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
      <div className={`rounded-lg p-6 w-full max-w-md ${plainBg} mx-3 sm:mx-0 shadow-2xl border border-gray-700/10`}>
        <h3 className={`text-lg font-bold mb-4 ${textColor}`}>
          {status === "success" ? "✅ Message Sent!" : "Send a Message"}
        </h3>

        {status === "error" && (
          <p className="text-red-500 text-sm mb-4">Failed to send. Please try again.</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className={`text-sm font-medium ${textColor}`}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClasses}
            required
            disabled={status === "loading"}
          />

          <label className={`text-sm font-medium ${textColor}`}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            required
            disabled={status === "loading"}
          />

          <label className={`text-sm font-medium ${textColor}`}>Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={inputClasses}
            required
            disabled={status === "loading"}
          />

          <label className={`text-sm font-medium ${textColor}`}>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={inputClasses}
            rows={4}
            required
            disabled={status === "loading"}
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded cursor-pointer ${secondBgClassOpposite} ${altText} hover:opacity-90 transition`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className={`px-4 py-2 rounded cursor-pointer ${secondBgClassOpposite} ${altText} hover:opacity-90 transition disabled:bg-gray-400`}
            >
              {status === "loading" ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}