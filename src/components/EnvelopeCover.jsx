import React, { useState, useEffect } from "react";
import { playEnvelopeOpenSound } from "../utils/audio";
import stamp from "../assets/stamp.png"

export default function EnvelopeCover({ onOpen, celebrant }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Lock scroll while envelope is closed
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleOpen = () => {
    if (isAnimating || isOpen) return;
    setIsAnimating(true);
    playEnvelopeOpenSound();

    // Trigger flap slides
    setTimeout(() => {
      setIsOpen(true);
      if (onOpen) onOpen();
    }, 150);

    // Remove from DOM after transition completes
    setTimeout(() => {
      setIsRemoved(true);
      document.body.style.overflow = "auto";
    }, 1400);
  };

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 w-screen h-screen z-50 overflow-hidden select-none pointer-events-auto transition-opacity duration-500 ${
        isOpen ? "pointer-events-none" : ""
      }`}
      aria-label="Հրավիրատոմսի ծրար"
    >
      {/* Top Envelope Flap */}
      <div
        className="absolute bg-[#3B5373]/50 top-0 left-0 w-full h-[62%] z-30 transition-transform duration-[1300ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          backgroundColor: "#F0E8D9",
          clipPath: "polygon(-120% 0%, 215% 0%, 50% 100%)",
          boxShadow: "0 10px 35px rgba(0,0,0,0.12)",
          transform: isOpen ? "translateY(-105%)" : "translateY(0%)",
        }}
      >
        {/* Subtle interior envelope paper fold shadow */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(0,0,0,0.2))",
          }}
        />
      </div>

      {/* Bottom Envelope Flap */}
      <div
        className="absolute bottom-0 left-0 w-full h-[88%] z-10 transition-transform duration-[1300ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          backgroundColor: "#3B5373",
          clipPath: "polygon(-120% 0%, 205% 0%, 50% 100%)",
          transform: isOpen ? "translateY(105%) rotate(180deg)" : "translateY(0%) rotate(180deg)",
          boxShadow: "inset 0 10px 30px rgba(0,0,0,0.15)",
        }}
      />

      {/* Center Wax Seal Button */}
      <div
        onClick={handleOpen}
        className={`absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 cursor-pointer transition-all duration-500 group flex flex-col items-center ${
          isOpen ? "opacity-0 scale-90 pointer-events-none" : "hover:scale-105 active:scale-95"
        }`}
      >

        <img src={stamp} className="w-40" />  

        {/* Small subtle prompt below seal */}
        <span className="text-[11px] text-[#FAF6F0]/90 uppercase tracking-[0.2em] mt-3 font-sans font-light drop-shadow">
          Հպվեք կնիքին
        </span>
      </div>
    </div>
  );
}
