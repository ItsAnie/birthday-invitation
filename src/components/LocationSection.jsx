
import React, { useState, useEffect, useRef } from "react";

export default function LocationSection({ venue, photos }) {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(venue.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const reveal = (delay = 0) => ({
    style: {
      transitionDelay: isVisible ? `${delay}ms` : "0ms",
    },
    className: `transition-all duration-800 ease-out ${
      isVisible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-8"
    }`,
  });

  return (
    <section
      ref={sectionRef}
      className="text-center pt-12 bg-white overflow-hidden"
    >
      <div>
        {/* Main Blue Block */}
        <div
          style={{
            transitionDelay: isVisible ? "100ms" : "0ms",
          }}
          className={`bg-[#3b5373] rounded-[50px] pt-16 pb-12 px-6 sm:px-8 border border-[#E8E1D7] shadow-[0_10px_35px_-8px_rgba(80,65,55,0.08)] transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* Heading */}
          <h2
            {...reveal(200)}
            className={`font-serif-am text-3xl sm:text-4xl text-white font-normal tracking-wide mb-3 ${reveal(200).className}`}
            style={reveal(200).style}
          >
            {venue.categoryLabel || "Ռեստորան"}
          </h2>

          {/* Venue Name */}
          <h3
            style={reveal(350).style}
            className={`font-serif-am text-2xl sm:text-3xl text-white font-light leading-snug mb-3 ${reveal(350).className}`}
          >
            {venue.name} <br />
            {venue.subName}
          </h3>

          {/* Time Display */}
          <div
            style={reveal(500).style}
            className={`font-serif-am text-5xl sm:text-6xl font-light text-white my-4 ${reveal(500).className}`}
          >
            {venue.timeDisplay}
          </div>

          {/* Vertical Separator */}
          <div
            style={reveal(600).style}
            className={`w-px h-24 bg-white/25 mx-auto my-6 transition-all duration-1000 ${
              isVisible ? "scale-y-100" : "scale-y-0"
            }`}
          />

          {/* Venue Photo */}
          <div
            style={reveal(700).style}
            className={`relative mx-auto w-full max-w-[280px] aspect-[4/3] rounded-[50px] overflow-hidden border border-[#E5DDD3] shadow-sm mb-6 bg-[#F0EAE1] ${reveal(700).className}`}
          >
            <img
              src={photos.venuePhoto}
              alt="Venue"
              className={`w-full h-full object-cover transition-transform duration-[1500ms] ease-out ${
                isVisible ? "scale-100" : "scale-110"
              }`}
              loading="lazy"
            />
          </div>

          {/* Map Link and Address */}
          <div
            style={reveal(900).style}
            className={`space-y-2 mb-8 ${reveal(900).className}`}
          >
            <a
              href={venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-3 font-serif-am text-2xl sm:text-3xl text-white hover:text-[#2C2622] underline underline-offset-8 transition-colors inline-block"
            >
              Քարտեզ
            </a>

            <div className="text-xs text-white font-sans pt-1">
              {venue.address}
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="text-[11px] text-white hover:underline pt-1 cursor-pointer font-sans"
            >
              {copied ? "Հասցեն պատճենվեց ✓" : "Պատճենել հասցեն"}
            </button>
          </div>
        </div>

        {/* Closing Phrase */}
        <div
          style={reveal(1100).style}
          className={`mt-12 mb-6 ${reveal(1100).className}`}
        >
          <h2 className="font-serif-am text-2xl sm:text-3xl text-[#4A423D] font-normal leading-relaxed whitespace-pre-line">
            {venue.closingWarmQuote || "Եկեք միասին կիսենք\nուրախությունն ու ժպիտները"}
          </h2>
        </div>
      </div>
    </section>
  );
}
