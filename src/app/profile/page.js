export const metadata = {
  title: "Profile Settings - Form Buddy AI | Manage Your Account",
  description: "Manage your Form Buddy AI account settings, view your subscription plan, update profile information, and track your usage statistics.",
  keywords: "profile settings, account management, subscription plan, form buddy profile, user settings, account dashboard",
  alternates: {
    canonical: 'https://formbuddyai.com/profile',
  },
  openGraph: {
    title: 'Profile Settings - Form Buddy AI | Manage Your Account',
    description: 'Manage your Form Buddy AI account settings, view subscription plan, and update profile information.',
    url: 'https://formbuddyai.com/profile',
    images: [
      {
        url: '/ico.png',
        width: 1200,
        height: 630,
        alt: 'Form Buddy AI - Profile Settings',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profile Settings - Form Buddy AI | Manage Your Account',
    description: 'Manage your Form Buddy AI account settings and subscription plan.',
    images: ['/ico.png'],
  },
};

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/lib/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import BillingSection from '@/components/BillingSection';

export default function ProfilePage() {
  const { currentUser, userData, loading, updateUserProfile } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && !currentUser && isClient) {
      router.push("/");
    }
  }, [currentUser, loading, router, isClient]);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        displayName: currentUser.displayName || '',
        email: currentUser.email || '',
      });
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUserProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: currentUser?.displayName || '',
      email: currentUser?.email || '',
    });
    setIsEditing(false);
  };

  // Show loading while checking authentication
  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated
  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Navbar showUpgradeButton={false} />
      <div style={{ paddingTop: "80px" }}> {/* Add padding to account for fixed navbar */}
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 font-poppins mb-4">
                Profile Settings
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your account information and preferences
              </p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-blue-100 overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] px-8 py-12">
                <div className="flex items-center space-x-6">
                  {/* Profile Picture */}
                  <div className="relative">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                      {currentUser.photoURL ? (
                        <Image
                          src={currentUser.photoURL}
                          alt="Profile"
                          width={88}
                          height={88}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                          <svg className="w-12 h-12 text-[#2196F3]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="text-white">
                    <h2 className="text-2xl font-bold font-poppins">
                      {currentUser.displayName || 'User'}
                    </h2>
                    <p className="text-blue-100 text-sm">
                      {currentUser.email}
                    </p>
                    <div className="mt-3">
                      <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                        userData?.planType === 'pro' 
                          ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white' 
                          : userData?.planType === 'basic'
                          ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white'
                          : 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white'
                      }`}>
                        {userData?.planType === 'pro' ? (
                          <>
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            PRO MEMBER
                          </>
                        ) : userData?.planType === 'basic' ? (
                          <>
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            BASIC MEMBER
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            FREE MEMBER
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              <div className="p-8">
                <div className="space-y-6">
                  {/* Display Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-text)' }}>
                      Display Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 text-gray-900 bg-white"
                        style={{ fontFamily: 'var(--font-text)' }}
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900">
                        {currentUser.displayName || 'Not set'}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-text)' }}>
                      Email Address
                    </label>
                    <div className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900">
                      {currentUser.email}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Email cannot be changed from this page
                    </p>
                  </div>

                  {/* Account Plan */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Current Plan
                    </h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center bg-blue-50 rounded-xl p-4 relative">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                          <svg className={`w-6 h-6 text-white ${
                            userData?.planType === 'pro' 
                              ? 'transform rotate-45' 
                              : userData?.planType === 'basic'
                              ? 'transform rotate-0'
                              : 'transform rotate-0'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {userData?.planType === 'pro' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            ) : userData?.planType === 'basic' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )}
                          </svg>
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium text-gray-900 text-sm">
                              {userData?.planType === 'pro' ? 'Pro Plan' : userData?.planType === 'basic' ? 'Basic Plan' : 'Free Plan'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {userData?.planStatus === 'active' ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          
                          {/* Usage Bar - Not shown for Pro plan */}
                          {userData?.planType !== 'pro' && (
                            <div className="mt-2">
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-gray-600">
                                  {userData?.planType === 'basic' ? 'Monthly Usage' : 'Total Usage'}
                                </span>
                                <span className="text-xs font-medium text-gray-900">
                                  {userData?.uploadCount || 0}/
                                  {userData?.planType === 'basic' ? '15' : '3'}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    userData?.planType === 'basic' 
                                      ? 'bg-blue-500' 
                                      : ((userData?.uploadCount || 0) >= 3) 
                                        ? 'bg-red-500' 
                                        : 'bg-green-500'
                                  }`}
                                  style={{ 
                                    width: `${Math.min(100, ((userData?.uploadCount || 0) / (userData?.planType === 'basic' ? 15 : 3)) * 100)}%` 
                                  }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {userData?.planType === 'basic' 
                                  ? 'Up to 15 forms per month' 
                                  : 'Limited to 3 forms lifetime'}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {userData?.planType !== 'pro' && (
                        <button
                          onClick={() => router.push('/#pricing')}
                          className="flex items-center justify-center px-4 py-2 text-white rounded-full transition-all gap-2 text-sm font-semibold"
                          style={{
                            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #FFA500, #FF8C00)';
                            e.target.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
                            e.target.style.transform = 'scale(1)';
                          }}
                        >
                          <span>Upgrade</span>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4 pt-4">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleCancel}
                          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                          style={{ fontFamily: 'var(--font-text)' }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={isSaving}
                          className={`px-6 py-3 bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white rounded-xl hover:from-[#1976D2] hover:to-[#1565C0] transition-all duration-200 font-medium ${
                            isSaving ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          style={{ fontFamily: 'var(--font-text)' }}
                        >
                          {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-3 bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white rounded-xl hover:from-[#1976D2] hover:to-[#1565C0] transition-all duration-200 font-medium"
                        style={{ fontFamily: 'var(--font-text)' }}
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Settings */}
            <div className="mt-8 bg-white rounded-3xl shadow-xl border-2 border-blue-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 font-poppins mb-6">
                Account Settings
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Language Preferences</h4>
                    <p className="text-sm text-gray-500">Choose your preferred language for explanations</p>
                  </div>
                  <div className="text-sm text-gray-700">
                    {userData?.planType === 'pro' ? 'All languages available' : 'English only'}
                  </div>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Account Type</h4>
                    <p className="text-sm text-gray-500">Your current subscription status</p>
                  </div>
                  <div className="text-sm text-gray-700">
                    {userData?.planType === 'pro' ? 'Premium User' : userData?.planType === 'basic' ? 'Basic User' : 'Free User'}
                  </div>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Member Since</h4>
                    <p className="text-sm text-gray-500">When you joined Form Buddy</p>
                  </div>
                  <div className="text-sm text-gray-700">
                    {currentUser.metadata?.creationTime ? 
                      new Date(currentUser.metadata.creationTime).toLocaleDateString() : 
                      'Recently'
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Section */}
            <div className="mt-8">
              <BillingSection />
            </div>
          </div>
        </div>
      </div>
      <Footer hideVideo={true} />
    </>
  );
}
