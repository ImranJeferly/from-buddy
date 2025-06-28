import React from "react";

const features = [
  {
    title: "Understand Immigration Forms Without Stress",
    description:
      "FormBuddy AI helps immigrants and visa applicants understand complex forms like I-130, DS-160, or asylum applications. No more confusion — just clear explanations in your language, spoken by your friendly AI guide.",
  },
  {
    title: "Make Medical Forms Easy for Parents and Grandparents",
    description:
      "Your elderly loved ones no longer need to struggle with healthcare paperwork. FormBuddy AI explains doctor’s office forms, insurance paperwork, and consent forms with clear voice and easy-to-understand language.",
  },
  {
    title: "Translate and Explain Forms in Your Own Language",
    description:
      "FormBuddy AI speaks your language — literally. Whether it's Azerbaijani, Spanish, Turkish, or Urdu, the app explains every part of the form in clear spoken sentences so nothing gets lost in translation.",
  },
  {
    title: "Understand Legal Forms Without Needing a Lawyer",
    description:
      "Confused by rental agreements, NDAs, or court paperwork? FormBuddy AI explains legal documents in plain language so you know exactly what you're signing — no lawyer required.",
  },
  {
    title: "Get Help Filling Out School and Scholarship Forms",
    description:
      "FormBuddy AI helps students and parents understand school enrollment forms, scholarship applications, and financial aid paperwork with a simple walk-through and voice explanations.",
  },
  {
    title: "Help for Business Forms, Invoices & Applications",
    description:
      "Running a small business? FormBuddy AI explains invoice templates, tax forms, supplier agreements, and grant applications in plain terms so you can focus on growing your business.",
  },
  {
    title: "Accessible AI for Visually Impaired or Dyslexic Users",
    description:
      "FormBuddy AI doesn’t just show — it speaks. For users with low vision, dyslexia, or reading challenges, our voice-first experience turns any document into a step-by-step audio guide.",
  },
];

export default function FeaturesColumn() {
  return (
    <section className="features-column-section bg-white py-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {features.map((feature, idx) => (
          <div
            key={feature.title}
            className={`flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-16 min-h-[320px] md:min-h-[400px] lg:min-h-[480px] ${
              idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-2xl font-brand text-blue-700 mb-2">{feature.title}</h3>
              <p className="text-base text-gray-700 font-normal">{feature.description}</p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-64 h-40 bg-blue-100 border-4 border-blue-300 rounded-2xl flex items-center justify-center">
                <span className="text-blue-400 font-bold text-lg">Image</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
