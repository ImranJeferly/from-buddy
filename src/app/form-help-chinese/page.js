export const metadata = {
  title: "中文表格填写帮助 - 移民、税务、银行表格 | Form Buddy AI",
  description: "用中文理解复杂表格。获得移民表格(I-485, I-130, N-400)、税务申报、银行开户等表格的清晰中文解释和语音指导。专为中文用户设计。",
  keywords: "中文表格帮助, 移民表格中文, 税务表格中文, 银行开户中文, I-485中文, N-400中文, 中文填表助手, 华人表格帮助, 中文语音解释",
  alternates: {
    canonical: 'https://formbuddyai.com/form-help-chinese',
  },
  openGraph: {
    title: '中文表格填写帮助 - 移民、税务、银行表格',
    description: '用中文理解复杂表格。获得移民、税务、银行等表格的清晰中文解释和语音指导。专为中文用户设计。',
    url: 'https://formbuddyai.com/form-help-chinese',
    images: [
      {
        url: '/ico.png',
        width: 1200,
        height: 630,
        alt: 'Form Buddy AI - 中文帮助',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '中文表格填写帮助 - 移民、税务、银行表格',
    description: '用中文理解复杂表格。获得移民、税务、银行等表格的清晰中文解释。',
    images: ['/ico.png'],
  },
};

"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function FormHelpChinesePage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <section className="bg-gradient-to-b from-white to-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/flags/cn.webp"
                alt="Chinese flag"
                width={96}
                height={64}
                className="rounded-lg shadow-md"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-poppins">
              中文表格填写帮助
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              用中文理解任何复杂表格。获得移民、税务、医疗保险等表格的清晰解释和语音指导。
            </p>
            <Link href="/upload">
              <button className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                上传我的表格
              </button>
            </Link>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">为中文用户提供专业表格帮助</h2>
            <p className="text-lg text-gray-600 mb-8">
              无论是绿卡申请、税务申报还是银行开户，我们都能用清晰的中文为您解释每一个字段的含义和填写要求。
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">移民表格</h3>
                <p className="text-gray-600">I-485, I-130, N-400等</p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">税务文件</h3>
                <p className="text-gray-600">1040表格和ITIN申请</p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">银行文件</h3>
                <p className="text-gray-600">开户申请和贷款文件</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}