"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import PaginatedFormView from "@/components/PaginatedFormView";

export default function ExplanationPage() {
  const { currentUser, userData, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [explanation, setExplanation] = useState(null);

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
    <div className="min-h-screen flex flex-col w-full">
      {/* Full-screen paginated form view with video section */}
      <PaginatedFormView 
        fields={explanation.fields || []}
        formTitle={explanation.title || "Form Questionnaire"}
        formSource={explanation.source || ""}
        userPlan={userData?.planType || 'free'}
      />
    </div>
  );
}
