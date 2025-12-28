// The "Ruskin Bond" style content for the travelogue

export type SectionData = {
  id: string;
  title: string;
  subtitle: string;
  text: string[]; // Paragraphs
  image: string; // URL
  imageAlt: string;
  theme: 'light' | 'dark' | 'river' | 'green';
};

export const travelogueData: SectionData[] = [
  {
    id: "intro",
    title: "The Smiling Coast",
    subtitle: "A Whisper of West Africa",
    text: [
      "There is a sliver of land, sliced into the heart of West Africa, where the river runs deep and the smiles run deeper. They call it The Smiling Coast, but to know Gambia is to know the rhythm of the tides and the whisper of the mangroves.",
      "It is not a place that shouts for attention. Instead, it waits, patient as the baobab, inviting you to slow your pulse to the beat of the Atlantic surf. Here, time is not measured in minutes, but in the lengthening shadows of the palms."
    ],
    image: "https://images.unsplash.com/photo-1543160875-c052994c6f39?q=80&w=2940&auto=format&fit=crop", // Evocative river/nature
    imageAlt: "A serene view of the Gambia river at sunset",
    theme: 'light'
  },
  {
    id: "river",
    title: "The River's Pulse",
    subtitle: "Liquid Gold",
    text: [
      "The Gambia River is not just water; it is a highway of history, a serpentine mirror reflecting the baobabs that stand like ancient sentinels on its banks. It cleaves the land in two, a life-giving artery throbbing with stories untold.",
      "At dawn, the mist rises like a prayer, revealing pirogues gliding silently, their fishermen casting nets into the liquid gold. To drift upon these waters is to drift back in time, where the only sound is the dip of the paddle and the cry of the fish eagle."
    ],
    image: "https://images.unsplash.com/photo-1627393498308-f4b6a9457224?q=80&w=2940&auto=format&fit=crop", // Boat on river
    imageAlt: "Traditional wooden boats floating on the river",
    theme: 'river'
  },
  {
    id: "nature",
    title: "The Green Embrace",
    subtitle: "Makasutu & Abuko",
    text: [
      "Step into the green embrace of Makasutu. The air here is thick with the scent of wild jasmine and damp earth. It is a cathedral of leaves, where the sunlight filters through in dappled shards, illuminating the forest floor.",
      "Baboons chatter in the canopy, a cacophony of life that feels ancient and undisturbed. The violet turaco flashes its crimson wings—a jewel in the rough. In these sacred woods, one feels small, grounded, and infinitely connected to the breathing earth."
    ],
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2938&auto=format&fit=crop", // Lush green nature
    imageAlt: "Lush green forest canopy",
    theme: 'green'
  },
  {
    id: "history",
    title: "Echoes of Stone",
    subtitle: "Kunta Kinteh Island",
    text: [
      "Juffureh and Kunta Kinteh Island sit heavy with memory. Here, the stones speak of sorrow, of a past that must never be forgotten. The river breeze carries a solemn weight as it passes over the crumbling brickwork of Fort James.",
      "It is a place of pilgrimage, a reminder of resilience etched into the very soil. Standing here, looking out at the vast expanse of water, one offers a silent tribute to the ancestors. It is a haunting beauty, a scar that has healed but remains visible, teaching us the value of freedom."
    ],
    image: "https://images.unsplash.com/photo-1596323497746-b3334237599c?q=80&w=2940&auto=format&fit=crop", // Old ruins or evocative texture
    imageAlt: "Ruins of an old fort against the sky",
    theme: 'dark'
  }
];
