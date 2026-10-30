
import React, { useState, useEffect, useRef } from "react";
import {
  generateGoogleCalendarUrl,
  downloadIcsFile,
} from "../utils/calendar";
import heart from "../assets/heart.png";
import hero from "../assets/hero.jpg";

export default function SaveTheDateSection({
  calendar,
  event,
  venue,
  photos,
}) {
  const [showCalOptions, setShowCalOptions] = useState(false);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const daysInMonth = calendar.daysInMonth || 30;
  const highlightDay = calendar.highlightDay || 21;

  const sundayOffset = calendar.firstDayWeekdayIndex ?? 0;
  const startOffset = (sundayOffset + 6) % 7;

  const totalSlots = Math.ceil((startOffset + daysInMonth) / 7) * 7;

  const calendarDays = [];

  for (let i = 0; i < totalSlots; i++) {
    const dayNumber = i - startOffset + 1;
    calendarDays.push(
      dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null
    );
  }

  const googleCalUrl = generateGoogleCalendarUrl(event, venue);

  const handleDownloadIcs = () => {
    downloadIcsFile(event, venue);
    setShowCalOptions(false);
  };

  const weekdays = calendar.weekdayHeaders || [
    "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-white py-16 sm:py-20 text-center overflow-hidden"
    >
      <div className="elaris-container">

        {/* Hero Image */}
        {photos?.celebrationArch1 && (
          <div
            style={{ transitionDelay: "100ms" }}
            className={`mx-auto mb-14 w-full max-w-[310px] sm:max-w-[350px] transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-[50px]">
              <img
                src={hero}
                alt="Celebration moment"
                className={`h-full w-full object-cover transition-transform duration-[1500ms] ease-out ${
                  isVisible ? "scale-100" : "scale-110"
                }`}
                loading="lazy"
              />
            </div>
          </div>
        )}

        {/* Calendar */}
        <div
          style={{ transitionDelay: "250ms" }}
          className={`mx-auto w-full max-w-[450px] px-2 transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >

          {/* Month title */}
          <h2 className="text-4xl sm:text-5xl text-[#4a424d] font-normal mb-5">
            {calendar.monthTitle || "Նոյեմբեր"}
          </h2>

          {/* Top line */}
          <div className="h-px w-full bg-[#3b5373]/60 mb-6" />

          {/* Weekday names */}
          <div className="grid grid-cols-7 mb-3">
            {weekdays.map((dayName, idx) => (
              <div
                key={idx}
                style={{ transitionDelay: `${400 + idx * 60}ms` }}
                className={`font-serif-am text-sm sm:text-base text-[#4a424d] font-normal transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
              >
                {dayName}
              </div>
            ))}
          </div>

          {/* Calendar dates */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, idx) => {
              if (day === null) {
                return <div key={idx} className="h-[40px]" />;
              }

              const isHighlight = day === highlightDay;

              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${450 + idx * 35}ms`,
                  }}
                  className={`flex h-[40px] items-center justify-center transition-all duration-500 ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3"
                  }`}
                >
                  <div className="relative flex h-10 w-10 items-center justify-center">

                    {isHighlight && (
                      <span
                        className={`absolute top-2 inset-0 bg-contain bg-center bg-no-repeat transition-all duration-1000 ease-out ${
                          isVisible
                            ? "scale-100 opacity-100"
                            : "scale-50 opacity-0"
                        }`}
                        style={{ backgroundImage: `url(${heart})` }}
                      />
                    )}

                    <span
                      className={`relative z-10 font-serif-am text-xl sm:text-lg ${
                        isHighlight
                          ? "text-white"
                          : "text-[#4a423d]"
                      }`}
                    >
                      {day}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom line */}
          <div className="h-px w-full bg-[#3b5373]/60 mt-6" />

          {/* Add to calendar */}
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setShowCalOptions(!showCalOptions)}
              aria-expanded={showCalOptions}
              className="inline-flex items-center gap-2 text-xs tracking-wide text-[#172C49]/75 hover:text-[#7D263F] transition-colors duration-300"
            >
              <span>
                {showCalOptions
                  ? "Փակել ընտրանքները"
                  : "Ավելացնել օրացույցում"}
              </span>

              <svg
                className={`h-3 w-3 transition-transform duration-300 ${
                  showCalOptions ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m5 7.5 5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {showCalOptions && (
              <div className="mt-4 flex flex-wrap justify-center gap-3 animate-[fadeUp_0.5s_ease-out_both]">
                <a
                  href={googleCalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#172C49]/25 px-4 py-2 text-xs text-[#172C49] hover:bg-[#172C49] hover:text-white transition-all duration-300"
                >
                  Google Calendar
                </a>

                <button
                  type="button"
                  onClick={handleDownloadIcs}
                  className="border border-[#172C49]/25 px-4 py-2 text-xs text-[#172C49] hover:bg-[#172C49] hover:text-white transition-all duration-300"
                >
                  iCal / Outlook
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
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
