
import React, { useEffect, useState } from "react";
import bg_img from "../assets/bg-img.jpg";

export default function HeroSection({ celebrant, event, photos }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const revealStyle = (delay = 0, duration = 1800) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(30px)",
    transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
  });

  return (
    <section
      className="relative flex flex-col items-center justify-center pt-8 pb-12 text-center overflow-hidden h-screen bg-no-repeat"
      style={{
        backgroundImage: `url(${bg_img})`,
        backgroundPosition: "center",
      }}
    >
      <div className="elaris-container">

        {/* Title */}
        <div
          className="space-y-1 mb-8 mt-30"
          style={revealStyle(1800)}
        >
          <h1 className="parisienne text-3xl sm:text-4xl text-[#3b5373] font-bold tracking-wide">
            Elen’s Birthday
          </h1>

          {/* Age */}
          <div
            className="parisienne text-5xl sm:text-7xl font-light text-[#3b5373] tracking-tight pt-2"
            style={{
              ...revealStyle(2600),
              transform: visible
                ? "scale(1)"
                : "scale(0.8) translateY(20px)",
            }}
          >
            {celebrant.age}
          </div>
        </div>

        {/* Date */}
        <div
          className="inline-flex items-center justify-center gap-4 py-2 px-6 border-y border-[#3b5373] my-2"
          style={revealStyle(3400)}
        >
          <span className="arm-coronet text-base sm:text-2xl text-[#2C2622] tracking-wider uppercase">
            {event.monthNameArmenian}
          </span>

          <span className="parisienne text-3xl sm:text-5xl font-light text-[#3b5373] px-2">
            {event.dayNumber}
          </span>

          <span className="font-serif-am text-base sm:text-2xl text-[#2C2622] tracking-wider uppercase">
            {event.weekdayArmenian}
          </span>
        </div>
      </div>

      {/* Decorative elements */}
      <div
        className="flex flex-col gap-2 items-center justify-center mt-8"
        style={revealStyle(4200)}
      >
        <div className="star w-[32px] h-[32px] bg-[#3b5373]/80 rounded-full" />

        <div
          className="w-[8px] h-[8px] bg-[#3b5373]/80 rounded-full"
          style={{ animationDuration: "2s" }}
        />

        <div
          className="w-[5px] h-[5px] bg-[#3b5373]/80 rounded-full"
          style={{ animationDuration: "2.5s", animationDelay: "0.3s" }}
        />
      </div>
    </section>
  );
}
