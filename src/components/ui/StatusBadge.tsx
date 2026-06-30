import React from 'react';

interface StatusBadgeProps {
  label: string;
  color: string;
  bgColor: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatusBadge({ label, color, bgColor, icon, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wide ${className}`}
      style={{
        background: bgColor,
        color: color,
      }}
    >
      {icon && React.cloneElement(icon as React.ReactElement, { size: 12 })}
      {label}
    </span>
  );
}
