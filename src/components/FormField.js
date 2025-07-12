"use client";

import React, { useState } from 'react';
import '@/styles/form-field.css';

/**
 * A component that renders a form field based on its type
 * @param {Object} props
 * @param {Object} props.field - The field object containing label, type, description, etc.
 */
const FormField = ({ field }) => {
  const [value, setValue] = useState(
    field.type === 'checkbox' ? false : 
    field.type === 'select' ? (field.options && field.options[0] || '') : 
    ''
  );

  const handleChange = (e) => {
    const newValue = field.type === 'checkbox' ? e.target.checked : e.target.value;
    setValue(newValue);
  };

  const inputId = `form-field-${field.label?.replace(/\s+/g, '-').toLowerCase() || Math.random().toString(36).substring(2, 9)}`;
  
  // Show required indicator if field is marked as required
  const requiredIndicator = field.required ? (
    <span className="text-red-500 ml-1">*</span>
  ) : null;

  // Common classes for consistent styling
  const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500";
  const labelClasses = "block text-sm font-medium text-gray-700";

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'password':
      case 'number':
      case 'date':
      case 'time':
      case 'url':
        return (
          <input
            type={field.type}
            id={inputId}
            name={inputId}
            className={inputClasses}
            value={value}
            onChange={handleChange}
            required={field.required}
            placeholder={field.placeholder || ''}
          />
        );
        
      case 'textarea':
        return (
          <textarea
            id={inputId}
            name={inputId}
            className={`${inputClasses} h-24`}
            value={value}
            onChange={handleChange}
            required={field.required}
            placeholder={field.placeholder || ''}
          />
        );
        
      case 'select':
        return (
          <select
            id={inputId}
            name={inputId}
            className={inputClasses}
            value={value}
            onChange={handleChange}
            required={field.required}
          >
            {/* If no options are provided, create a default empty option */}
            {(!field.options || field.options.length === 0) ? (
              <option value="">-- Select an option --</option>
            ) : (
              field.options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))
            )}
          </select>
        );
        
      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={inputId}
              name={inputId}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={value}
              onChange={handleChange}
              required={field.required}
            />
            <label htmlFor={inputId} className="ml-2 text-sm text-gray-700">{field.label}{requiredIndicator}</label>
          </div>
        );
        
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options ? field.options.map((option, index) => {
              const optionId = `${inputId}-option-${index}`;
              return (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={optionId}
                    name={inputId}
                    value={option}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={value === option}
                    onChange={handleChange}
                    required={field.required && index === 0}
                  />
                  <label htmlFor={optionId} className="ml-2 text-sm text-gray-700">{option}</label>
                </div>
              );
            }) : (
              <div className="text-sm text-gray-500">No options available</div>
            )}
          </div>
        );

      default:
        // For unknown field types, default to text input
        return (
          <input
            type="text"
            id={inputId}
            name={inputId}
            className={inputClasses}
            value={value}
            onChange={handleChange}
            required={field.required}
            placeholder={field.placeholder || ''}
          />
        );
    }
  };

  // For checkbox type, the label is rendered within the input section
  if (field.type === 'checkbox') {
    return (
      <div className="mb-4">
        {renderField()}
        {field.description && (
          <p className="mt-1 text-xs text-gray-500">{field.description}</p>
        )}
      </div>
    );
  }

  // For all other field types
  return (
    <div className="mb-4">
      <label htmlFor={inputId} className={labelClasses}>
        {field.label}{requiredIndicator}
      </label>
      {renderField()}
      {field.description && (
        <p className="mt-1 text-xs text-gray-500">{field.description}</p>
      )}
    </div>
  );
};

export default FormField;
