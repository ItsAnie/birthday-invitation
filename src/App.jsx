import React from "react";
import { invitationData } from "./config/invitationData";
import EnvelopeCover from "./components/EnvelopeCover";
import HeroSection from "./components/HeroSection";
import CountdownSection from "./components/CountdownSection";
import MessageSection from "./components/MessageSection";
import SaveTheDateSection from "./components/SaveTheDateSection";
import RSVPSection from "./components/RSVPSection";
import LocationSection from "./components/LocationSection";
import FooterSection from "./components/FooterSection";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-[#2C2622] relative overflow-x-hidden selection:bg-[#876E59]/20 selection:text-[#2C2622]">
      {/* 1. Envelope Opening Screen (Matches reference S4 mechanism in Elaris aesthetic) */}
      <EnvelopeCover
        celebrant={invitationData.celebrant}
      />

      {/* 2. Main Digital Invitation Content (Sequential flow as reference) */}
      <main className="relative z-10">
        {/* Section 1: Hero Cover */}
        <HeroSection
          celebrant={invitationData.celebrant}
          event={invitationData.event}
          photos={invitationData.photos}
        />

        {/* Section 2: Countdown & Age */}
        <CountdownSection
          celebrant={invitationData.celebrant}
          event={invitationData.event}
        />

        {/* Section 3: Cake & Personal Message */}
        <MessageSection
          message={invitationData.message}
        />

        {/* Section 4: Save the Date & Calendar Grid */}
        <SaveTheDateSection
          calendar={invitationData.calendar}
          event={invitationData.event}
          venue={invitationData.venue}
          photos={invitationData.photos}
        />

        {/* Section 5: RSVP Form */}
        <RSVPSection
          photos={invitationData.photos}
        />

        {/* Section 6: Event Details & Location */}
        <LocationSection
          venue={invitationData.venue}
          photos={invitationData.photos}
        />
      </main>

      {/* Section 7: Delicate Footer */}
      <FooterSection
        celebrant={invitationData.celebrant}
      />
    </div>
  );
}
