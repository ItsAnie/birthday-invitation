import React from "react";
import bg_img from '../assets/invite-bg.jpg'

export default function MessageSection({ message }) {
  return (
    <section className="pt-12 text-center h-full flex flex-col justify-center bg-cover bg-no-repeat items-center" style={{
                      backgroundImage: `url(${bg_img})`,
                      backgroundSize: '100% 100%'
                    }} >
      <div className="elaris-container py-20" >
      
        {/* Heading: Սիրելի ընկերներ */}
        <h2 className="font-serif-am uppercase text-2xl sm:text-4xl text-[#2C2622] font-normal tracking-wide mb-6">
          {message.greeting || "Սիրելի հյուրեր"}
        </h2>

        {/* Invitation Text */}
        <div className="font-serif-am text-lg sm:text-xl text-[#4A423D] max-w-sm mx-auto mb-8 px-6">
          <p>{message.text}</p>
          <p className="mt-6">Սիրով, Էլեն</p>
        </div>
      </div>
    </section>
  );
}
