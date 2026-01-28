/**
 * Componente de badge reutilizável seguindo o design system
 */

import React from 'react';
import { classNames } from '../../styles/theme';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  const variantClasses = {
    success: classNames.badge.success,
    warning: classNames.badge.warning,
    error: classNames.badge.error,
    info: classNames.badge.info,
    default: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };

  return (
    <span
      className={`
        ${classNames.badge.default}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;
