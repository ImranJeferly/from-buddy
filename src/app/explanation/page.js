"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function ExplanationPage() {
  const { currentUser, userData, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [sourceType, setSourceType] = useState('');
  const [sourceName, setSourceName] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && !currentUser && isClient) {
      router.push("/");
    }
  }, [currentUser, loading, router, isClient]);

  useEffect(() => {
    const checkExplanationData = () => {
      // Check if we have a valid explanation session in localStorage
      if (isClient && currentUser) {
        try {
          const explanationData = localStorage.getItem('explanationData');
          
          if (!explanationData) {
            // No explanation data, redirect to upload page
            console.log("No explanation data found, redirecting to upload...");
            router.push("/upload");
            return;
          }
          
          const parsedData = JSON.parse(explanationData);
          
          // Check if explanation data has not expired (30 minutes)
          const now = new Date();
          const timestamp = new Date(parsedData.timestamp);
          const diffMinutes = (now - timestamp) / (1000 * 60);
          
          if (diffMinutes > 30) {
            // Explanation has expired, redirect to upload
            console.log("Explanation data expired, redirecting to upload...");
            localStorage.removeItem('explanationData');
            router.push("/upload");
            return;
          }
          
          // Check if explanation data contains required fields
          if (!parsedData.explanation || !parsedData.sourceType) {
            console.log("Invalid explanation data, redirecting to upload...");
            localStorage.removeItem('explanationData');
            router.push("/upload");
            return;
          }
          
          // Set explanation data
          setExplanation(parsedData.explanation);
          setSourceType(parsedData.sourceType);
          setSourceName(parsedData.sourceName || '');
          
        } catch (error) {
          console.error("Error parsing explanation data:", error);
          localStorage.removeItem('explanationData');
          router.push("/upload");
        }
      }
    };

    // Wait for authentication check to complete before checking explanation data
    if (!loading) {
      checkExplanationData();
    }
  }, [isClient, router, currentUser, loading]);

  // Show loading while checking authentication or fetching data
  if (loading || !isClient || !explanation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading explanation...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar showUpgradeButton={true} />
      <div style={{ paddingTop: "80px" }}> {/* Add padding to account for fixed navbar */}
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Form Explanation
                  </h1>
                  <div className="flex items-center text-gray-500 text-sm">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date().toLocaleDateString()}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="capitalize">{sourceType}</span>
                    {sourceName && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="truncate max-w-[200px]" title={sourceName}>{sourceName}</span>
                      </>
                    )}
                  </div>
                </div>
                <Link href="/upload" className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200">
                  Upload New
                </Link>
              </div>
            </div>
            
            {/* Main content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              {/* Section: Generated Explanation */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Generated Explanation
                </h2>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  {explanation.summary && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Summary</h3>
                      <p className="text-gray-700">{explanation.summary}</p>
                    </div>
                  )}
                  
                  {explanation.sections && explanation.sections.map((section, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      {section.title && (
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{section.title}</h3>
                      )}
                      <div className="text-gray-700">
                        {section.content}
                      </div>
                    </div>
                  ))}
                  
                  {!explanation.sections && !explanation.summary && (
                    <div className="text-gray-700">
                      <p>{explanation.content || "This document has been processed. The explanation is available below."}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Section: Action Items */}
              {explanation.actionItems && explanation.actionItems.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Action Items
                  </h2>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <ul className="space-y-3">
                      {explanation.actionItems.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 text-blue-500">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="ml-3 text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Next steps */}
              <div className="flex justify-center mt-8">
                <Link 
                  href="/upload"
                  className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white py-3 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Process Another Document
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer hideVideo={true} />
    </>
  );
}
