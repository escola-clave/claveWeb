/**
 * Card de estatística reutilizável
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Card } from './Card';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  gradient?: string;
  iconColor?: string;
  onClick?: () => void;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  gradient = 'from-purple-500/20 to-pink-500/20',
  iconColor = 'from-purple-500 to-pink-500',
  onClick,
}: StatCardProps) {
  return (
    <Card
      gradient={gradient}
      onClick={onClick}
      interactive={!!onClick}
      padding="md"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-purple-300 mb-1">{label}</p>
          <p className="text-3xl font-bold text-white mb-2">
            {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
          </p>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${
              trend.direction === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              <span>{trend.direction === 'up' ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div className={`bg-gradient-to-br ${iconColor} p-3 rounded-xl`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  );
}

export default StatCard;
