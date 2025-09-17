export const metadata = {
  title: "Login - Access Your Form Buddy AI Account | Secure Sign In",
  description: "Sign in to your Form Buddy AI account to access unlimited form analysis, multilingual support, and AI-powered document explanations. Secure login with Google and Facebook options.",
  keywords: "form buddy login, sign in, user account, form analysis account, AI form helper login, secure login, google sign in, facebook sign in",
  alternates: {
    canonical: 'https://formbuddyai.com/login',
  },
  openGraph: {
    title: 'Login - Access Your Form Buddy AI Account',
    description: 'Sign in to your Form Buddy AI account to access unlimited form analysis, multilingual support, and AI-powered document explanations.',
    url: 'https://formbuddyai.com/login',
    images: [
      {
        url: '/ico.png',
        width: 1200,
        height: 630,
        alt: 'Form Buddy AI - Login',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Login - Access Your Form Buddy AI Account',
    description: 'Sign in to your Form Buddy AI account to access unlimited form analysis and multilingual support.',
    images: ['/ico.png'],
  },
};

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PlayfulButton from "@/components/PlayfulButton";
import { useAuth } from "@/lib/AuthContext";
import CartoonInput from "@/components/CartoonInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();
  const { login, signInWithGoogle, signInWithFacebook, currentUser } = useAuth();

  // Redirect if already logged in or after successful login
  useEffect(() => {
    if (currentUser) {
      router.push("/upload");
    }
  }, [currentUser, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await login(email, password);
      setLoginSuccess(true);
      // Don't redirect immediately - let the useEffect handle it when currentUser is set
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.code === "auth/user-not-found" || err.code === "auth/wrong-password"
          ? "Invalid email or password"
          : err.code === "auth/too-many-requests"
          ? "Too many failed login attempts. Please try again later."
          : "Failed to login. Please try again."
      );
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      setLoginSuccess(true);
      // Don't redirect immediately - let the useEffect handle it when currentUser is set
    } catch (err) {
      console.error("Google sign in error:", err);
      setError("Google sign in failed. Please try again.");
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithFacebook();
      setLoginSuccess(true);
      // Don't redirect immediately - let the useEffect handle it when currentUser is set
    } catch (err) {
      console.error("Facebook sign in error:", err);
      setError("Facebook sign in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-white">
        <div className="absolute top-6 left-6 z-10">
          <Link href="/" className="flex items-center text-gray-600 hover:text-brand-blue transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center">
          <div className="login-container flex flex-1 h-screen bg-white shadow-sm">
            {/* Left side - Login form */}
            <div className="w-full lg:w-1/2 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 py-6 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full bg-white p-6 rounded-xl">
                <div className="text-center lg:text-left mb-4">
                  <h1 className="text-3xl text-brand-blue font-bold font-poppins mb-1">Welcome Back!</h1>
                  <p className="text-gray-600">Sign in to your Form Buddy account</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 text-red-600 rounded-lg p-4 text-sm mb-6 shadow-sm">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p>{error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {loginSuccess && (
                    <div className="bg-green-50 border-l-4 border-green-400 text-green-600 rounded-lg p-4 text-sm mb-6 shadow-sm">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p>Login successful! Redirecting to upload page...</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <CartoonInput
                      label="Email"
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      rightElement={
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      }
                    />
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 ml-2">
                        Password
                      </label>
                      <Link 
                        href="/forgot-password" 
                        className="text-xs font-medium text-brand-blue hover:text-brand-dark transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    
                    <CartoonInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      rightElement={
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-gray-600 focus:outline-none pointer-events-auto"
                        >
                          {showPassword ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      }
                    />
                  </div>
                  
                  <div className="mt-6">
                    <PlayfulButton 
                      type="submit" 
                      disabled={loading}
                      gradient="basic"
                      className="w-full py-3 mx-auto"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing in...
                        </span>
                      ) : (
                        "Sign In"
                      )}
                    </PlayfulButton>
                  </div>
                  
                  <div className="text-center mt-5">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <Link href="/register" className="font-medium text-brand-blue hover:text-brand-dark transition-colors">
                        Sign up
                      </Link>
                    </p>
                  </div>
                  
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500 font-medium">or continue with</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="flex items-center justify-center py-3 px-6 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-blue-200 transition-all shadow-md hover:shadow-lg w-full max-w-xs"
                      style={{
                        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
                      }}
                      disabled={loading}
                    >
                      <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      <span className="font-medium text-gray-700">Continue with Google</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Right side - Background Image with rounded corners and spacing */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-10 rounded-2xl">
              <div className="w-full h-[100%] relative overflow-hidden bg-blue-50 rounded-2xl">
                <Image
                  src="/form-login-bg.png"
                  alt="Form Buddy AI"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Light gradient overlay to ensure contrast with potential image content */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
