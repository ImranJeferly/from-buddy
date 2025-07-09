"use client";

import React, { forwardRef } from 'react';

const CartoonInput = forwardRef(({ 
  label, 
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  required,
  minLength,
  error,
  helpText,
  rightElement,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1 ml-2">
          {label} {required && <span className="text-brand-blue">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          id={id}
          name={name || id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          className={`
            w-full px-4 py-3
            bg-white border-2 
            ${error ? 'border-red-300 focus:border-red-500' : 'border-blue-100 focus:border-brand-blue'} 
            rounded-2xl
            font-medium text-gray-700
            placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-blue-200
            shadow-sm
            transition-all duration-200
          `}
          {...props}
        />
        
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightElement}
          </div>
        )}
      </div>
      
      {helpText && !error && (
        <p className="mt-1 ml-2 text-xs text-gray-500">{helpText}</p>
      )}
      
      {error && (
        <p className="mt-1 ml-2 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
});

CartoonInput.displayName = 'CartoonInput';

export default CartoonInput;
