
import React, { useState, useEffect, useRef } from "react";

export default function RSVPSection({ photos }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [name, setName] = useState("");
  const [response, setResponse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !response) {
      setErrorMessage("Խնդրում ենք լրացնել Ձեր անունը և ընտրել տարբերակը:");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const animationClass = (delay) => ({
    transitionDelay: isVisible ? `${delay}ms` : "0ms",
  });

  const visibilityClass = (delay) =>
    `transition-all duration-700 ease-out ${
      isVisible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-6"
    }`;

  return (
    <section
      ref={sectionRef}
      className="pb-12 text-center bg-white overflow-hidden"
    >
      <div className="elaris-container">

        {/* Section Heading */}
        <h2
          style={animationClass(100)}
          className={`font-serif-am text-3xl sm:text-4xl text-[#2C2622] font-normal tracking-wide mb-2 ${visibilityClass()}`}
        >
          RSVP
        </h2>

        {/* Subtitle */}
        <p
          style={animationClass(250)}
          className={`font-serif-am text-lg sm:text-xl text-[#6E645D] mb-8 ${visibilityClass()}`}
        >
          Կմիանա՞ք տոնին, թե ոչ։
        </p>

        {/* RSVP Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center max-w-[320px] mx-auto space-y-6"
        >
          {/* Name Input */}
          <div
            style={animationClass(400)}
            className={`w-full ${visibilityClass()}`}
          >
            <input
              type="text"
              placeholder="Ձեր Անունը"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              className="w-full text-xs sm:text-2xl py-2.5 bg-transparent border-b border-[#3b5373]/60 focus:border-[#3b5373] outline-none text-[#2C2622] placeholder:text-[#A0958B] transition-colors"
            />
          </div>

          {/* Yes / No Buttons */}
          <div
            style={animationClass(550)}
            className={`flex items-center justify-center gap-4 w-full pt-2 ${visibilityClass()}`}
          >
            <button
              type="button"
              onClick={() => {
                setResponse("yes");
                if (errorMessage) setErrorMessage("");
              }}
              className={`flex-1 py-3 px-6 rounded-2xl font-serif-am text-lg sm:text-xl transition-all border cursor-pointer ${
                response === "yes"
                  ? "bg-[#3b5373] text-white border-[#3b5373] shadow-sm"
                  : "bg-white text-[#4A423D] border-[#3b5373]/60 hover:border-[#876E59]/50"
              }`}
            >
              Այո
            </button>

            <button
              type="button"
              onClick={() => {
                setResponse("no");
                if (errorMessage) setErrorMessage("");
              }}
              className={`flex-1 py-3 px-6 rounded-2xl font-serif-am text-lg sm:text-xl transition-all border cursor-pointer ${
                response === "no"
                  ? "bg-[#3b5373] text-white border-[#3b5373] shadow-sm"
                  : "bg-white text-[#4A423D] border-[#3b5373]/60 hover:border-[#3b5373]/50"
              }`}
            >
              Ոչ
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-xs text-rose-600 font-sans mt-2">
              {errorMessage}
            </p>
          )}

          {/* Submit Button */}
          <div
            style={animationClass(700)}
            className={`w-full ${visibilityClass()}`}
          >
            <button
              type="submit"
              disabled={!name.trim() || !response || isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#3b5373] hover:bg-[#725C4A] disabled:opacity-40 disabled:hover:bg-[#876E59] text-white font-serif-am text-lg tracking-wide transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Ուղարկվում է..." : "Ուղարկել"}
            </button>
          </div>

          {/* Success Notification */}
          {submitted && (
            <div className="w-full p-4 rounded-2xl bg-white border border-[#E0D7CC] text-center font-serif-am text-sm sm:text-base text-[#2C2622] animate-in fade-in duration-300 shadow-sm mt-3">
              {response === "yes"
                ? "Ձեր «Այո» պատասխանը հաջողությամբ գրանցվեց։ Սպասում ենք Ձեզ:"
                : "Ձեր «Ոչ» պատասխանը հաջողությամբ գրանցվեց։"}
            </div>
          )}
        </form>

      </div>
    </section>
  );
}
