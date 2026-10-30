
import React, { useState, useEffect, useRef } from "react";

export default function CountdownSection({ celebrant, event }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(event.isoDate).getTime();
      const currentTime = new Date().getTime();
      const diff = targetTime - currentTime;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [event.isoDate]);

  const pad = (n) => String(n).padStart(2, "0");

  const units = [
    { label: "Օր", value: pad(timeLeft.days) },
    { label: "Ժամ", value: pad(timeLeft.hours) },
    { label: "Րոպե", value: pad(timeLeft.minutes) },
    { label: "Վրկ", value: pad(timeLeft.seconds) },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-10 text-center bg-white overflow-hidden"
    >
      <div className="elaris-container">

        <h2
          className={`font-serif-am text-3xl sm:text-4xl text-[#2C2622] font-normal tracking-wide mb-4 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          Մինչ հանդիսությունը մնաց՝
        </h2>

        <div className="grid grid-cols-4 py-5 my-4">
          {units.map((unit, idx) => (
            <div
              key={idx}
              style={{ transitionDelay: isVisible ? `${idx * 150}ms` : "0ms" }}
              className={`flex flex-col items-center justify-center px-2 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              } ${
                idx !== units.length - 1
                  ? "border-r border-[#3b5373]/40"
                  : ""
              }`}
            >
              <span
                key={unit.value}
                className="font-serif-am text-2xl sm:text-3xl text-[#2C2622] font-light tracking-tight mb-1 animate-[numberChange_0.35s_ease-out]"
              >
                {unit.value}
              </span>

              <span className="font-serif-am text-xs sm:text-sm text-[#7E746C] tracking-wide">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {timeLeft.isExpired && (
          <p className="text-xs text-[#876E59] mt-3 font-sans">
            Տոնակատարությունը սկսվել է կամ ավարտվել է:
          </p>
        )}
      </div>

      <style>{`
        @keyframes numberChange {
          from {
            opacity: 0.4;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
