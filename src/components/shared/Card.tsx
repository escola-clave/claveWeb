/**
 * Componente de card reutilizável seguindo o design system
 */

import React from 'react';
import { motion } from 'motion/react';
import { classNames } from '../../styles/theme';

interface CardProps {
  children: React.ReactNode;
  interactive?: boolean;
  gradient?: string;
  onClick?: () => void;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export function Card({
  children,
  interactive = false,
  gradient,
  onClick,
  className = '',
  padding = 'md',
  hover = true,
}: CardProps) {
  const Component = onClick || interactive ? motion.button : motion.div;
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseClasses = `
    ${classNames.card.base}
    ${paddingClasses[padding]}
    ${gradient ? `bg-gradient-to-br ${gradient}` : ''}
    ${hover && (onClick || interactive) ? classNames.card.hover : ''}
    ${interactive ? classNames.card.interactive : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  return (
    <Component
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={onClick || interactive ? { scale: 1.02 } : undefined}
      whileTap={onClick || interactive ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={baseClasses}
    >
      {children}
    </Component>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={`text-xl font-bold text-white ${className}`}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p className={`text-sm text-purple-300 mt-1 ${className}`}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`mt-4 ${className}`}>
      {children}
    </div>
  );
}

export default Card;
