"use client";

import React, { useState } from 'react';
import FormField from './FormField';

/**
 * A component that renders a dynamic form based on the fields in the explanation
 * @param {Object} props
 * @param {Array} props.fields - The array of field objects from the explanation
 */
const DynamicForm = ({ fields }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    // Log form submission (would normally send data to an API)
    console.log('Form submitted');
    
    // Reset form status after a few seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };
  
  if (!fields || fields.length === 0) {
    return (
      <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100 text-center">
        <p className="text-yellow-700">
          No form fields were detected in this document.
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <FormField key={index} field={field} />
          ))}
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className={`px-4 py-2 rounded-lg shadow-sm text-white font-medium 
              ${formSubmitted 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-blue-600 hover:bg-blue-700'} 
              transition-colors duration-200`}
            disabled={formSubmitted}
          >
            {formSubmitted ? 'Submitted!' : 'Submit Form'}
          </button>
        </div>
        
        {formSubmitted && (
          <div className="mt-4 p-3 bg-green-50 text-green-800 rounded-lg text-sm">
            Form submitted successfully! This is a preview mode, so no data was actually sent.
          </div>
        )}
      </form>
    </div>
  );
};

export default DynamicForm;
