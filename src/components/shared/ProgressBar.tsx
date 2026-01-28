/**
 * Componente de barra de progresso reutilizável
 */

import React from 'react';
import { motion } from 'motion/react';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  showLabel?: boolean;
  label?: string;
  gradient?: string;
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = true,
  label,
  gradient = 'from-purple-500 to-pink-500',
  height = 'md',
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-sm text-purple-300 mb-2">
          <span>{label || 'Progresso'}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`bg-white/10 rounded-full ${heightClasses[height]} overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`bg-gradient-to-r ${gradient} ${heightClasses[height]} rounded-full`}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
