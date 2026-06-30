import React, { useState, useRef, useEffect } from 'react';
import { currentTheme } from '../../theme/theme';
import { CheckCircle } from 'lucide-react';

export interface FormSelectProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  error?: string;
  showSearch?: boolean;
  className?: string;
  required?: boolean;
}

export function FormSelect({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select...',
  error,
  showSearch = false,
  className = '',
  required
}: FormSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const ACCENT = currentTheme.primary;
  const ACCENT_LIGHT = currentTheme.surfaceAlt;
  const ACCENT_DARK = currentTheme.heroEnd;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredOptions = showSearch
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const selectedOption = options.find((o) => o.value === value);
  const hasError = !!error;

  return (
    <div className={`w-full ${className}`} ref={ref}>
      {label && (
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={`w-full rounded-xl border bg-gray-50 px-3.5 py-2.5 text-sm text-left flex justify-between items-center transition-all focus:outline-none focus:ring-2 focus:bg-white`}
          style={{
            borderColor: hasError ? "#EF4444" : open ? ACCENT : "#E5E7EB",
            color: selectedOption ? "#1F2937" : "#9CA3AF",
            "--tw-ring-color": hasError ? "#FECACA" : ACCENT,
          } as React.CSSProperties}
        >
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
          <svg
            className="transition-transform duration-200 shrink-0"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", color: "#9CA3AF" }}
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {open && (
          <div
            className="absolute z-[60] mt-1.5 w-full min-w-max bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
            style={{ boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)" }}
          >
            {showSearch && (
              <div className="p-2 border-b border-gray-100">
                <input
                  autoFocus
                  className="w-full bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none border border-gray-200 focus:border-blue-500 placeholder-gray-400"
                  placeholder="Cari..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            )}
            
            <div className="py-1.5 max-h-60 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-400 text-center">Tidak ditemukan</div>
              ) : (
                filteredOptions.map((opt) => {
                  const isActive = value === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        onChange(opt.value);
                        setOpen(false);
                        setSearch("");
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between"
                      style={{
                        background: isActive ? ACCENT_LIGHT : "transparent",
                        color: isActive ? ACCENT_DARK : "#374151",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.background = "#F9FAFB";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <span className="font-medium truncate pr-4">{opt.label}</span>
                      {isActive && <CheckCircle size={14} color={ACCENT} className="shrink-0" />}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">{error}</p>}
    </div>
  );
}
