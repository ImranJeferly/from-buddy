export const metadata = {
  title: "مساعدة ملء النماذج باللغة العربية - الهجرة، اللجوء | Form Buddy AI",
  description: "افهم أي نموذج معقد بشرح واضح باللغة العربية. احصل على مساعدة في نماذج الهجرة، اللجوء، التأمين الطبي، والخدمات الاجتماعية مع الشرح الصوتي بالعربية.",
  keywords: "مساعدة نماذج عربية, نماذج الهجرة بالعربية, نماذج اللجوء بالعربية, تعبئة نماذج عربية, مساعدة عربية للنماذج, شرح النماذج بالعربية",
  alternates: {
    canonical: 'https://formbuddyai.com/form-help-arabic',
  },
  openGraph: {
    title: 'مساعدة ملء النماذج باللغة العربية - الهجرة، اللجوء',
    description: 'افهم أي نموذج معقد بشرح واضح باللغة العربية. مساعدة في نماذج الهجرة واللجوء والخدمات الاجتماعية.',
    url: 'https://formbuddyai.com/form-help-arabic',
    images: [
      {
        url: '/ico.png',
        width: 1200,
        height: 630,
        alt: 'Form Buddy AI - مساعدة بالعربية',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'مساعدة ملء النماذج باللغة العربية',
    description: 'افهم أي نموذج معقد بشرح واضح باللغة العربية. شرح صوتي بالعربية.',
    images: ['/ico.png'],
  },
};

"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function FormHelpArabicPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <section className="bg-gradient-to-b from-white to-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/flags/sa.webp"
                alt="Arabic flag"
                width={96}
                height={64}
                className="rounded-lg shadow-md"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-poppins">
              مساعدة ملء النماذج باللغة العربية
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              افهم أي نموذج معقد بشرح واضح باللغة العربية. احصل على مساعدة في نماذج الهجرة والضرائب والتأمين الطبي وغيرها.
            </p>
            <Link href="/upload">
              <button className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                رفع النموذج الخاص بي
              </button>
            </Link>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">مساعدة متخصصة للمتحدثين بالعربية</h2>
            <p className="text-lg text-gray-600 mb-8">
              سواء كانت طلبات اللجوء، أو نماذج الهجرة، أو التأمين الصحي، نحن نشرح لك كل حقل ومتطلباته بلغة عربية واضحة.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">نماذج الهجرة</h3>
                <p className="text-gray-600">طلبات اللجوء والإقامة</p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">الخدمات الاجتماعية</h3>
                <p className="text-gray-600">المساعدات الحكومية</p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">التأمين الصحي</h3>
                <p className="text-gray-600">التسجيل في البرامج الطبية</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}