/**
 * Badge de nível do artista
 */

import React from 'react';
import { motion } from 'motion/react';
import { theme } from '../../styles/theme';

type LevelType = 'SHOWER' | 'GARAGE' | 'UNDERGROUND' | 'INDIE' | 'RISING_STAR' | 'HEADLINER' | 'MAIN_STAGE';

interface LevelBadgeProps {
  level: LevelType;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

const LEVEL_CONFIG = {
  SHOWER: { name: 'Artista de Chuveiro', icon: '🚿', color: 'from-gray-400 to-gray-500' },
  GARAGE: { name: 'Garagem', icon: '🏠', color: 'from-indigo-500 to-indigo-600' },
  UNDERGROUND: { name: 'Underground', icon: '🎸', color: 'from-purple-500 to-purple-600' },
  INDIE: { name: 'Indie', icon: '🎤', color: 'from-pink-500 to-pink-600' },
  RISING_STAR: { name: 'Estrela em Ascensão', icon: '⭐', color: 'from-orange-500 to-yellow-500' },
  HEADLINER: { name: 'Atração Principal', icon: '🌟', color: 'from-yellow-500 to-yellow-600' },
  MAIN_STAGE: { name: 'Palco Principal', icon: '👑', color: 'from-yellow-400 to-yellow-500' },
};

export function LevelBadge({
  level,
  showLabel = true,
  size = 'md',
  onClick,
  className = '',
}: LevelBadgeProps) {
  const levelInfo = LEVEL_CONFIG[level];
  
  const sizeClasses = {
    sm: {
      container: 'px-2 py-1',
      icon: 'text-sm',
      text: 'text-[10px]',
      name: 'text-xs',
    },
    md: {
      container: 'px-3 py-1.5',
      icon: 'text-base',
      text: 'text-[10px]',
      name: 'text-sm',
    },
    lg: {
      container: 'px-4 py-2',
      icon: 'text-xl',
      text: 'text-xs',
      name: 'text-base',
    },
  };

  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      whileHover={onClick ? { scale: 1.05 } : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
      onClick={onClick}
      className={`
        flex items-center gap-2 bg-gradient-to-br ${levelInfo.color}
        rounded-lg ${sizeClasses[size].container} shadow-lg
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <span className={sizeClasses[size].icon}>{levelInfo.icon}</span>
      {showLabel && (
        <div>
          <p className={`${sizeClasses[size].text} text-white/80 leading-none`}>Nível</p>
          <p className={`${sizeClasses[size].name} font-bold text-white leading-none mt-0.5`}>
            {levelInfo.name}
          </p>
        </div>
      )}
    </Component>
  );
}

export default LevelBadge;
