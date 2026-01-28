/**
 * Card reutilizável para exibir stats de gamificação
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { classNames } from '../../styles/theme';

interface GamificationCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  gradient?: string;
  iconColor?: string;
  onClick?: () => void;
  className?: string;
}

export function GamificationCard({
  icon: Icon,
  label,
  value,
  gradient = 'from-purple-500/20 to-pink-500/20',
  iconColor = 'text-pink-400',
  onClick,
  className = '',
}: GamificationCardProps) {
  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      whileHover={onClick ? { scale: 1.05 } : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
      onClick={onClick}
      className={`
        flex items-center gap-2 bg-gradient-to-br ${gradient}
        border border-purple-500/30 rounded-lg px-3 py-1.5
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <Icon className={`w-4 h-4 ${iconColor}`} />
      <div>
        <p className="text-[10px] text-purple-300 leading-none">{label}</p>
        <p className="text-sm font-bold text-white leading-none mt-0.5">
          {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
        </p>
      </div>
    </Component>
  );
}

export default GamificationCard;
