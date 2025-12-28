import Hero from "@/components/Hero";
import Chapter from "@/components/Chapter";
import Footer from "@/components/Footer";
import { travelogueData } from "@/lib/data";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gambia-paper">
      <Hero />
      <div className="flex flex-col">
        {travelogueData.map((section, index) => (
          <Chapter key={section.id} data={section} index={index} />
        ))}
      </div>
      <Footer />
    </main>
  );
}
