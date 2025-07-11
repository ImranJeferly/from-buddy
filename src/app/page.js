import Image from "next/image";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AcceptedFormats from "../components/AcceptedFormats";
import DemoSection from "../components/DemoSection";
import FeaturesColumn from "../components/FeaturesColumn";
import UploadSection from "../components/UploadSection";
import PricingSection from "../components/PricingSection";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AcceptedFormats />
      <DemoSection />
      <FeaturesColumn />
      <UploadSection />
      <PricingSection />
      <FaqSection />
      <main style={{ padding: '1.5rem 0.5rem', width: '80%', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Home page content will be added here as we build the app. */}
      </main>
      <Footer />
    </>
  );
}
