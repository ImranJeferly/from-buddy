"use client";

import React from 'react';

/**
 * Component that displays a summary of detected form inputs
 * @param {Object} props
 * @param {Array} props.fields - The array of field objects from the explanation
 */
const FormSummary = ({ fields }) => {
  if (!fields || fields.length === 0) {
    return (
      <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
        <p className="text-yellow-700 text-center">
          No form fields were detected in this document.
        </p>
      </div>
    );
  }

  // Group fields by type for better organization
  const fieldGroups = {};
  fields.forEach(field => {
    const type = field.type || 'text';
    if (!fieldGroups[type]) {
      fieldGroups[type] = [];
    }
    fieldGroups[type].push(field);
  });

  const getFieldIcon = (type) => {
    switch(type) {
      case 'text':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v18m3-6h.01M9 13h.01M9 17h.01M9 9h.01" />
          </svg>
        );
      case 'textarea':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        );
      case 'select':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        );
      case 'checkbox':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'radio':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" fill="currentColor" />
          </svg>
        );
      case 'date':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'email':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'text': return 'Text Fields';
      case 'textarea': return 'Text Areas';
      case 'select': return 'Dropdown Fields';
      case 'checkbox': return 'Checkboxes';
      case 'radio': return 'Radio Buttons';
      case 'date': return 'Date Fields';
      case 'email': return 'Email Fields';
      case 'tel': return 'Phone Fields';
      case 'number': return 'Number Fields';
      case 'password': return 'Password Fields';
      case 'url': return 'URL Fields';
      case 'time': return 'Time Fields';
      default: return `${type.charAt(0).toUpperCase() + type.slice(1)} Fields`;
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-blue-100 rounded-full">
            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-blue-800 font-medium">
            {fields.length} form fields detected
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(fieldGroups).map(([type, typeFields]) => (
          <div key={type} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center text-blue-600">
                {getFieldIcon(type)}
              </div>
              <h3 className="font-medium text-gray-800">
                {getTypeLabel(type)} <span className="text-gray-500 font-normal">({typeFields.length})</span>
              </h3>
            </div>
            
            <ul className="divide-y divide-gray-100">
              {typeFields.map((field, index) => (
                <li key={index} className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{field.label || "Unlabeled Field"}</p>
                      {(field.description || field.required) && (
                        <p className="text-sm text-gray-500">
                          {field.description}
                          {field.description && field.required ? ' • ' : ''}
                          {field.required ? 'This input needs to be filled' : ''}
                        </p>
                      )}
                      
                      {(field.options && field.options.length > 0) && (
                        <div className="mt-1">
                          <p className="text-xs text-gray-500 mb-1">Options:</p>
                          <div className="flex flex-wrap gap-1">
                            {field.options.map((option, i) => (
                              <span key={i} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                {option}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Required badge removed as requested */}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormSummary;
