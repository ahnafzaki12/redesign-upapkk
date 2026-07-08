import React from 'react';
import { currentTheme } from '../../lib/theme';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const ACCENT = currentTheme.primary;

  let baseStyles = 'inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'text-white shadow-md hover:brightness-95',
    secondary: 'text-gray-600 bg-gray-100 hover:bg-gray-200',
    outline: 'text-gray-600 bg-white border border-gray-200 hover:bg-gray-50',
    danger: 'text-white bg-red-600 hover:bg-red-700 shadow-md',
    ghost: 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const style = variant === 'primary' ? { backgroundColor: ACCENT, boxShadow: `0 4px 14px ${ACCENT}40` } : {};
  if (variant === 'ghost') {
      baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed';
      sizes.sm = 'p-1.5 text-xs';
      sizes.md = 'p-2 text-sm';
      sizes.lg = 'p-3 text-base';
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={style}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </button>
  );
}
