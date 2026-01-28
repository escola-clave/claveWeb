/**
 * Componente de estado vazio reutilizável
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  iconGradient?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  iconGradient = 'from-purple-500 to-pink-500',
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
        className={`bg-gradient-to-br ${iconGradient} p-6 rounded-full mb-6`}
      >
        <Icon className="w-12 h-12 text-white" />
      </motion.div>
      
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-purple-300 mb-6 max-w-md">{description}</p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}

export default EmptyState;
