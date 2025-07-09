"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/lib/AuthContext";

const languages = [
  // Top 5 most common languages
  { code: 'en', name: 'English', flag: '/flags/gb.webp' },
  { code: 'zh', name: 'Chinese (Mandarin)', flag: '/flags/cn.webp' },
  { code: 'hi', name: 'Hindi', flag: '/flags/in.webp' },
  { code: 'es', name: 'Spanish', flag: '/flags/es.webp' },
  { code: 'ar', name: 'Arabic', flag: '/flags/sa.webp' },

  // Alphabetical order
  { code: 'sq', name: 'Albanian', flag: '/flags/al.webp' },
  { code: 'bn', name: 'Bengali', flag: '/flags/bd.webp' },
  { code: 'bs', name: 'Bosnian', flag: '/flags/ba.webp' },
  { code: 'bg', name: 'Bulgarian', flag: '/flags/bg.webp' },
  { code: 'my', name: 'Burmese', flag: '/flags/mm.webp' },
  { code: 'hr', name: 'Croatian', flag: '/flags/hr.webp' },
  { code: 'cs', name: 'Czech', flag: '/flags/cz.webp' },
  { code: 'da', name: 'Danish', flag: '/flags/dk.webp' },
  { code: 'nl', name: 'Dutch', flag: '/flags/nl.webp' },
  { code: 'et', name: 'Estonian', flag: '/flags/ee.webp' },
  { code: 'fi', name: 'Finnish', flag: '/flags/fi.webp' },
  { code: 'fr', name: 'French', flag: '/flags/fr.webp' },
  { code: 'de', name: 'German', flag: '/flags/de.webp' },
  { code: 'gu', name: 'Gujarati', flag: '/flags/in.webp' },
  { code: 'he', name: 'Hebrew', flag: '/flags/il.webp' },
  { code: 'hu', name: 'Hungarian', flag: '/flags/hu.webp' },
  { code: 'is', name: 'Icelandic', flag: '/flags/is.webp' },
  { code: 'id', name: 'Indonesian', flag: '/flags/id.webp' },
  { code: 'ga', name: 'Irish', flag: '/flags/ie.webp' },
  { code: 'it', name: 'Italian', flag: '/flags/it.webp' },
  { code: 'ja', name: 'Japanese', flag: '/flags/jp.webp' },
  { code: 'kn', name: 'Kannada', flag: '/flags/in.webp' },
  { code: 'km', name: 'Khmer', flag: '/flags/kh.webp' },
  { code: 'rw', name: 'Kinyarwanda', flag: '/flags/rw.webp' },
  { code: 'ko', name: 'Korean', flag: '/flags/kr.webp' },
  { code: 'lv', name: 'Latvian', flag: '/flags/lv.webp' },
  { code: 'lt', name: 'Lithuanian', flag: '/flags/lt.webp' },
  { code: 'mk', name: 'Macedonian', flag: '/flags/mk.webp' },
  { code: 'ml', name: 'Malayalam', flag: '/flags/in.webp' },
  { code: 'mt', name: 'Maltese', flag: '/flags/mt.webp' },
  { code: 'mr', name: 'Marathi', flag: '/flags/in.webp' },
  { code: 'me', name: 'Montenegrin', flag: '/flags/me.webp' },
  { code: 'ne', name: 'Nepali', flag: '/flags/np.webp' },
  { code: 'no', name: 'Norwegian', flag: '/flags/no.webp' },
  { code: 'or', name: 'Odia', flag: '/flags/in.webp' },
  { code: 'ps', name: 'Pashto', flag: '/flags/af.webp' },
  { code: 'fa', name: 'Persian (Farsi)', flag: '/flags/ir.webp' },
  { code: 'pl', name: 'Polish', flag: '/flags/pl.webp' },
  { code: 'pt', name: 'Portuguese', flag: '/flags/pt.webp' },
  { code: 'ro', name: 'Romanian', flag: '/flags/ro.webp' },
  { code: 'ru', name: 'Russian', flag: '/flags/ru.webp' },
  { code: 'sr', name: 'Serbian', flag: '/flags/rs.webp' },
  { code: 'si', name: 'Sinhala', flag: '/flags/lk.webp' },
  { code: 'sk', name: 'Slovak', flag: '/flags/sk.webp' },
  { code: 'sl', name: 'Slovenian', flag: '/flags/si.webp' },
  { code: 'sw', name: 'Swahili', flag: '/flags/ke.webp' },
  { code: 'sv', name: 'Swedish', flag: '/flags/se.webp' },
  { code: 'ta', name: 'Tamil', flag: '/flags/in.webp' },
  { code: 'te', name: 'Telugu', flag: '/flags/in.webp' },
  { code: 'th', name: 'Thai', flag: '/flags/th.webp' },
  { code: 'tr', name: 'Turkish', flag: '/flags/tr.webp' },
  { code: 'uk', name: 'Ukrainian', flag: '/flags/ua.webp' },
  { code: 'ur', name: 'Urdu', flag: '/flags/pk.webp' },
  { code: 'vi', name: 'Vietnamese', flag: '/flags/vn.webp' },
  { code: 'cy', name: 'Welsh', flag: '/flags/gb-wls.webp' },
  { code: 'xh', name: 'Xhosa', flag: '/flags/za.webp' },
  { code: 'zu', name: 'Zulu', flag: '/flags/za.webp' }
];

export default function LanguageSelector({ selectedLanguage, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isWarningDismissed, setIsWarningDismissed] = useState(false);
  const { userData } = useAuth();

  const selectedLang = languages.find(lang => lang.code === selectedLanguage) || languages[0];
  
  // Check if user has pro plan
  const isPro = userData?.plan === 'pro';

  // Load dismissed state from localStorage on component mount
  useEffect(() => {
    const dismissed = localStorage.getItem('languageWarningDismissed');
    if (dismissed === 'true') {
      setIsWarningDismissed(true);
    }
  }, []);

  const handleLanguageSelect = (language) => {
    // Only allow English for free/basic users
    if (!isPro && language.code !== 'en') {
      return; // Don't allow selection
    }
    onLanguageChange(language.code);
    setIsOpen(false);
  };

  const dismissWarning = () => {
    setIsWarningDismissed(true);
    localStorage.setItem('languageWarningDismissed', 'true');
  };

  return (
    <div className="relative mb-6">
      <label className="block text-sm font-light text-gray-700 mb-2" style={{ fontFamily: 'var(--font-text)' }}>
        What language would you like the explanation in?
      </label>
      
      {!isPro && !isWarningDismissed && (
        <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-amber-700">
                <span className="font-medium">Multiple languages available with PRO.</span> Currently limited to English.
              </p>
            </div>
            <button
              onClick={dismissWarning}
              className="ml-2 p-1 hover:bg-amber-100 rounded-full transition-colors duration-200 flex-shrink-0"
              aria-label="Dismiss warning"
            >
              <svg className="w-4 h-4 text-amber-500 hover:text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white border-2 border-blue-200 rounded-xl px-4 py-3 text-left shadow-sm hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src={selectedLang.flag}
                alt={`${selectedLang.name} flag`}
                width={32}
                height={22}
                className="rounded-md object-cover shadow-sm"
              />
              <span className="font-medium text-gray-900">{selectedLang.name}</span>
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'transform rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {isOpen && (
          <>
            {/* Backdrop to close dropdown */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown menu */}
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
              {languages.map((language) => {
                const isDisabled = !isPro && language.code !== 'en';
                
                return (
                  <button
                    key={language.code}
                    type="button"
                    onClick={() => handleLanguageSelect(language)}
                    disabled={isDisabled}
                    className={`w-full px-4 py-3 text-left transition-colors duration-150 relative ${
                      isDisabled
                        ? 'cursor-not-allowed opacity-50 bg-gray-50'
                        : 'hover:bg-blue-50 focus:bg-blue-50 focus:outline-none'
                    } ${
                      selectedLanguage === language.code ? 'bg-blue-50 border-l-4 border-blue-400' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={language.flag}
                          alt={`${language.name} flag`}
                          width={32}
                          height={22}
                          className={`rounded-md object-cover shadow-sm ${isDisabled ? 'grayscale' : ''}`}
                        />
                        <span className={`font-medium ${isDisabled ? 'text-gray-400' : 'text-gray-900'}`}>
                          {language.name}
                        </span>
                      </div>
                      {isDisabled && (
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs text-amber-600 font-medium">PRO</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
