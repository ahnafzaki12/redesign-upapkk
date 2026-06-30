import React from 'react';
import { currentTheme } from '../../theme/theme';

interface PageHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function PageHeader({ icon, title, description }: PageHeaderProps) {
  const ACCENT = currentTheme.primary;
  const ACCENT_DARK = currentTheme.heroEnd || currentTheme.primaryHover;
  const ACCENT_LIGHT = currentTheme.surfaceAlt || `${ACCENT}15`;

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm mb-6">
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl" style={{ backgroundColor: ACCENT_LIGHT }}>
            {React.cloneElement(icon as React.ReactElement, { size: 24, style: { color: ACCENT } })}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h1>
        </div>
        <p className="text-gray-500 text-sm sm:text-base max-w-2xl">
          {description}
        </p>
      </div>
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full opacity-[0.04]" style={{ background: ACCENT }} />
      <div className="pointer-events-none absolute bottom-0 right-24 h-32 w-32 rounded-full opacity-[0.05]" style={{ background: ACCENT_DARK }} />
    </div>
  );
}
