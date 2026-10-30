/**
 * Ծննդյան Թվային Հրավիրատոմսի Տվյալներ (Elaris Digital Invitation Config)
 * Կառուցվածքը համապատասխանում է թվային հրավիրատոմսերի հիմնական սկզբունքներին:
 */

export const invitationData = {
  // Հոբելյարի տվյալներ
  celebrant: {
    name: "Էլեն",
    fullName: "Էլեն Սարգսյան",
    birthdayTitle: "Elen’s Birthday",
    armenianTitle: "Էլենի Ծննդյան Տարեդարձը",
    age: "25",
    monogram: "ԷՍ",
  },

  // Միջոցառման ամսաթիվ և ժամ
  event: {
    isoDate: "2026-11-21T18:30:00",
    year: 2026,
    monthNameArmenian: "Նոյեմբեր",
    dayNumber: 21,
    weekdayArmenian: "Շաբաթ",
    timeArmenian: "18:30",
    fullDateDisplay: "Շաբաթ, 21 Նոյեմբերի, 2026 թ.",
    
    // Օրացույցի ներբեռնման տվյալներ
    calendarTitle: "Էլենի 25-ամյակի Տոնակատարություն",
    calendarDescription: "Սիրով հրավիրում ենք նշելու Էլենի 25-ամյակը «Villa Hills» հանդիսությունների համալիրում:",
    durationHours: 6,
  },

  // Անձնական ուղերձ
  message: {
    text: 'Շատ շուտով կկայանա իմ ծննդյան տարեդարձը։ Հրավիրում եմ իմ սրտում մեծ տեղ զբաղեցնող ամենամտերիմ և հարազատ մարդկանց միանալու այս հանդիսավոր տոնակատարությանը։'
  },

  // Օրացույցի (Save the date) պարամետրեր
  calendar: {
    monthTitle: "Նոյեմբեր",
    daysInMonth: 30,
    firstDayWeekdayIndex: 0, // 0 for Sunday
    highlightDay: 21,
    weekdayHeaders: ["Կ", "Ե", "Ե", "Չ", "Հ", "Ո", "Շ"], // Sun, Mon, Tue, Wed, Thu, Fri, Sat
  },

  // Ռեստորան և վայր
  venue: {
    categoryLabel: "Ռեստորան",
    name: "«Villa Hills»",
    subName: "Ռեստորանային Համալիր",
    timeDisplay: "18:30",
    address: "ք. Երևան / Ձորաղբյուր, Ամառանոցային փողոց 14",
    googleMapsUrl: "https://maps.google.com/?q=Villa+Hills+Dzoraghbyur+Armenia",
    closingWarmQuote: "Եկեք միասին կիսենք\nուրախությունն ու ժպիտները",
  },

  // Լուսանկարներ (Բնական, նրբագեղ, տաք բեժ/կրեմային գամմայով)
  photos: {
    heroPortrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85",
    celebrationArch1: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
    celebrationArch2: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=85",
    venuePhoto: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=85",
    finalPhoto: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=85",
  },
};
