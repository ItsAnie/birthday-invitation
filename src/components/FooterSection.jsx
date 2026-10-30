import React, { useState } from "react";
import { toggleAmbientMusic } from "../utils/audio";
import insta from '../assets/insta.png'

export default function FooterSection({ celebrant }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudioToggle = () => {
    const active = toggleAmbientMusic();
    setIsPlaying(active);
  };

  return (
    <footer className="pt-8 pb-14 text-center bg-white mt-0">
      <div className="elaris-container flex flex-col items-center">

        {/* Celebrant Monogram & Closing Line */}
        <div className="space-y-1 flex flex-col items-center gap-2 text-xs font-serif-am text-[#8F847A] tracking-wider">
          <div className="text-xl text-[#A69B91]">
            Elaris Digital Invitation
          </div>
          <img src={insta} className="w-[30px]" />
        </div>
      </div>
    </footer>
  );
}
