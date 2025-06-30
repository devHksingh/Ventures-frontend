import React, { useState, useEffect, useId } from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
}

export function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  className = '',
  error,
  id,
  name,
  required = false,
  disabled = false,
}: InputProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Use name as id if provided, otherwise use a placeholder during SSR
  const uniqueId = id || name || (mounted ? `input-${Math.random().toString(36).substr(2, 9)}` : 'input-placeholder');
    return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={uniqueId} 
          className="block text-sm font-medium text-black mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={uniqueId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-slate-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-500' : 'border-slate-400'
        } ${disabled ? 'bg-slate-300 text-slate-700' : ''}`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface TextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  error?: string;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

export function Textarea({
  label,
  placeholder,
  value,
  onChange,
  className = '',
  error,
  id,
  name,
  required = false,
  disabled = false,
  rows = 3,
}: TextareaProps) {
  const generatedId = useId();
  const uniqueId = id || generatedId;
  
  return (
    <div className={`w-full ${className}`}>      {label && (
        <label 
          htmlFor={uniqueId} 
          className="block text-sm font-medium text-black mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={uniqueId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-slate-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-500' : 'border-slate-400'
        } ${disabled ? 'bg-slate-200 text-slate-700' : ''}`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface SelectProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  className?: string;
  error?: string;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function Select({
  label,
  value,
  onChange,
  options,
  className = '',
  error,
  id,
  name,
  required = false,
  disabled = false,
  placeholder,
}: SelectProps) {
  const generatedId = useId();
  const uniqueId = id || generatedId;
  
  return (
    <div className={`w-full ${className}`}>      {label && (
        <label 
          htmlFor={uniqueId} 
          className="block text-sm font-medium text-black mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={uniqueId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-500' : 'border-slate-400'
        } ${disabled ? 'bg-slate-200 text-slate-700' : ''}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
