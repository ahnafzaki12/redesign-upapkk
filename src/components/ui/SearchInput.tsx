import React from 'react';
import { Search } from 'lucide-react';
import { currentTheme } from '../../lib/theme';

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: string;
  onChange: (val: string) => void;
}

export function SearchInput({ value, onChange, className = '', placeholder = 'Cari...', ...props }: SearchInputProps) {
  const ACCENT = currentTheme.primary;
  
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
        <Search className="w-4 h-4 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-white border border-slate-200/60 text-gray-900 text-sm rounded-xl focus:outline-none focus:ring-2 block pl-10 pr-4 py-2.5 transition-all shadow-sm hover:border-slate-300"
        style={{ "--tw-ring-color": ACCENT } as React.CSSProperties}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
}
