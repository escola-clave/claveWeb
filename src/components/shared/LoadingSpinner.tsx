/**
 * Componente de loading reutilizável
 */

import React from 'react';
import { motion } from 'motion/react';
import { Loader2, Music2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  message?: string;
  variant?: 'spinner' | 'music';
}

export function LoadingSpinner({
  size = 'md',
  fullScreen = false,
  message,
  variant = 'spinner',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const Icon = variant === 'spinner' ? Loader2 : Music2;

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={variant === 'spinner' ? { rotate: 360 } : { scale: [1, 1.2, 1] }}
        transition={
          variant === 'spinner'
            ? { duration: 1, repeat: Infinity, ease: 'linear' }
            : { duration: 1, repeat: Infinity }
        }
      >
        <Icon className={`${sizeClasses[size]} text-purple-400`} />
      </motion.div>
      {message && (
        <p className="text-sm text-purple-300 animate-pulse">{message}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export default LoadingSpinner;
