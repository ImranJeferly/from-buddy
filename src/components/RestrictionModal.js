"use client";

import React from "react";
import Link from "next/link";

export default function RestrictionModal({ 
  isOpen, 
  onClose, 
  type, 
  title, 
  message, 
  actionText = "Upgrade to Pro", 
  actionLink = "/#pricing" 
}) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'ip_overuse':
        return (
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        );
      case 'limit_reached':
        return (
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'unsupported_file':
        return (
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const getColors = () => {
    switch (type) {
      case 'ip_overuse':
        return {
          titleColor: 'text-red-800',
          messageColor: 'text-red-700',
          actionBg: 'bg-red-600 hover:bg-red-700',
          closeBg: 'border-red-300 text-red-600 hover:bg-red-50'
        };
      case 'limit_reached':
        return {
          titleColor: 'text-orange-800',
          messageColor: 'text-orange-700',
          actionBg: 'bg-orange-600 hover:bg-orange-700',
          closeBg: 'border-orange-300 text-orange-600 hover:bg-orange-50'
        };
      case 'unsupported_file':
        return {
          titleColor: 'text-blue-800',
          messageColor: 'text-blue-700',
          actionBg: 'bg-blue-600 hover:bg-blue-700',
          closeBg: 'border-blue-300 text-blue-600 hover:bg-blue-50'
        };
      default:
        return {
          titleColor: 'text-gray-800',
          messageColor: 'text-gray-700',
          actionBg: 'bg-gray-600 hover:bg-gray-700',
          closeBg: 'border-gray-300 text-gray-600 hover:bg-gray-50'
        };
    }
  };

  const colors = getColors();

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100">
        <div className="p-8">
          {/* Icon */}
          {getIcon()}
          
          {/* Content */}
          <div className="text-center">
            <h3 className={`text-2xl font-bold mb-4 ${colors.titleColor}`}>
              {title}
            </h3>
            <p className={`text-base mb-6 leading-relaxed ${colors.messageColor}`}>
              {message}
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {type === 'ip_overuse' || type === 'limit_reached' ? (
                <Link href={actionLink} onClick={onClose}>
                  <button className={`w-full sm:w-auto px-6 py-3 ${colors.actionBg} text-white rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span>{actionText}</span>
                  </button>
                </Link>
              ) : null}
              
              <button 
                onClick={onClose}
                className={`w-full sm:w-auto px-6 py-3 border-2 ${colors.closeBg} rounded-xl font-medium transition-colors duration-200`}
              >
                {type === 'unsupported_file' ? 'Try Another File' : 'Close'}
              </button>
            </div>
            
            {/* Additional Help Text */}
            {type === 'ip_overuse' && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  <strong>Alternative:</strong> You can also try using a different network connection to continue with the free plan.
                </p>
              </div>
            )}
            
            {type === 'unsupported_file' && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-700">
                  <strong>Supported formats:</strong> PDF, DOCX, JPG, PNG (max 10MB)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}