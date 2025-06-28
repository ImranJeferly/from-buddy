import Image from "next/image";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AcceptedFormats from "../components/AcceptedFormats";
import DemoSection from "../components/DemoSection";
import FeaturesColumn from "../components/FeaturesColumn";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AcceptedFormats />
      <DemoSection />
      <FeaturesColumn />
      <main style={{ padding: '1.5rem 0.5rem', width: '80%', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Home page content will be added here as we build the app. */}
      </main>
    </>
  );
}
