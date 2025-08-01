import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import AcceptedFormats from "../components/AcceptedFormats";
import DemoSection from "../components/DemoSection";
import FeaturesColumn from "../components/FeaturesColumn";
import PricingSection from "../components/PricingSection";
import Footer from "../components/Footer";

// Dynamically import client components with loading states
const ClientHero = dynamic(() => import("../components/ClientHero"), {
  loading: () => (
    <section className="hero-section flex items-center justify-center w-full px-2.5 gap-10" style={{ minHeight: 'calc(100vh - 80px)', height: 'calc(100dvh - 80px)', backgroundColor: '#FDFDFC' }}>
      <div className="hero-content flex flex-col items-start justify-center min-w-[260px] text-left flex-1">
        <h1 className="hero-title text-brand-blue text-5xl font-extrabold mb-5 leading-tight font-poppins">Upload Any Form.<br />Let AI Explain It.</h1>
        <p className="hero-desc font-text text-[#222] text-lg mb-8 max-w-xl">
          Struggling to understand complex forms? <span className="brand">Form Buddy AI</span> analyzes your uploaded forms and provides clear, step-by-step explanations for every input field. No more confusion—just clarity!
        </p>
        <div className="w-[200px] h-[48px] bg-gray-200 animate-pulse rounded-full"></div>
      </div>
      <div className="hero-image flex items-center justify-center select-none">
        <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    </section>
  )
});

const ClientUploadSection = dynamic(() => import("../components/ClientUploadSection"), {
  loading: () => (
    <section className="upload-section" style={{ backgroundColor: "#F7F7F8", padding: "4rem 1.5rem" }}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-full h-64 bg-gray-200 animate-pulse rounded-2xl"></div>
      </div>
    </section>
  )
});

const ClientFaqSection = dynamic(() => import("../components/ClientFaqSection"), {
  loading: () => (
    <section className="faq-section py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="home-h2 mb-16 text-center w-full !font-poppins font-bold text-gray-900">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6">
              <div className="w-full h-6 bg-gray-200 animate-pulse rounded mb-3"></div>
              <div className="w-3/4 h-4 bg-gray-200 animate-pulse rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
});

export default function Home() {
  return (
    <>
      <Navbar />
      <ClientHero />
      <AcceptedFormats />
      <DemoSection />
      <FeaturesColumn />
      <ClientUploadSection />
      <PricingSection />
      <ClientFaqSection />
      <main style={{ padding: '1.5rem 0.5rem', width: '80%', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Home page content will be added here as we build the app. */}
      </main>
      <Footer />
    </>
  );
}