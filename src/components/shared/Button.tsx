/**
 * Componente de botão reutilizável seguindo o design system
 */

import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { classNames } from '../../styles/theme';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const baseClasses = 'font-semibold transition-all inline-flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: classNames.button.primary,
    secondary: classNames.button.secondary,
    outline: classNames.button.outline,
    ghost: classNames.button.ghost,
    icon: classNames.button.icon,
  };

  const sizeClasses = {
    sm: 'py-2 px-4 text-sm rounded-md',
    md: 'py-3 px-6 text-base rounded-lg',
    lg: 'py-4 px-8 text-lg rounded-xl',
  };

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${variant !== 'icon' ? sizeClasses[size] : ''}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.02 } : undefined}
      whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      className={combinedClasses}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
      
      {children}
      
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
    </motion.button>
  );
}

export default Button;
