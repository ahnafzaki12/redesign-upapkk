import React, { useState } from 'react';
import { currentTheme } from '../../theme/theme';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  trailingSlot?: React.ReactNode;
}

export function FormInput({
  label,
  error,
  trailingSlot,
  className = '',
  onFocus,
  onBlur,
  ...props
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = !!error;
  const ACCENT = currentTheme.primary;
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full rounded-xl border bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-white transition-colors
            ${trailingSlot ? 'pr-10' : ''}
            ${props.disabled || props.readOnly ? 'cursor-not-allowed opacity-70' : ''}
          `}
          style={{
            borderColor: hasError ? "#EF4444" : (isFocused ? ACCENT : "#E5E7EB"),
            "--tw-ring-color": hasError ? "#FECACA" : ACCENT,
          } as React.CSSProperties}
          onFocus={(e) => {
            setIsFocused(true);
            if (onFocus) onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          {...props}
        />
        {trailingSlot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            {trailingSlot}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">{error}</p>}
    </div>
  );
}
