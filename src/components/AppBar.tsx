import React from 'react';
import { Music2, Bell, Flame, TrendingUp, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from './AuthContext';
import { useArtist } from './ArtistContext';

interface AppBarProps {
  onNotificationsClick?: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
  title?: string;
}

const LEVEL_CONFIG = {
  SHOWER: { name: 'Artista de Chuveiro', icon: '🚿', color: 'from-gray-400 to-gray-500' },
  GARAGE: { name: 'Garagem', icon: '🏠', color: 'from-indigo-500 to-indigo-600' },
  UNDERGROUND: { name: 'Underground', icon: '🎸', color: 'from-purple-500 to-purple-600' },
  INDIE: { name: 'Indie', icon: '🎤', color: 'from-pink-500 to-pink-600' },
  RISING_STAR: { name: 'Estrela em Ascensão', icon: '⭐', color: 'from-orange-500 to-yellow-500' },
  HEADLINER: { name: 'Atração Principal', icon: '🌟', color: 'from-yellow-500 to-yellow-600' },
  MAIN_STAGE: { name: 'Palco Principal', icon: '👑', color: 'from-yellow-400 to-yellow-500' }
};

export default function AppBar({ onNotificationsClick, onBack, showBackButton, title }: AppBarProps) {
  const { user } = useAuth();
  const { career } = useArtist();

  const levelInfo = LEVEL_CONFIG[career.level as keyof typeof LEVEL_CONFIG] || LEVEL_CONFIG.SHOWER;

  // Mock unread notifications count
  const unreadCount = 2;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-40 bg-gradient-to-r from-purple-900/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-xl border-b border-purple-500/30 shadow-lg shadow-purple-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
            {/* Back Button (Mobile) */}
            {showBackButton && onBack && (
              <button
                onClick={onBack}
                className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            )}

            {/* Logo + Brand */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl shadow-lg">
                <Music2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base md:text-lg font-bold text-white leading-tight">
                  Clave de Sales
                </h1>
                <p className="text-[10px] md:text-xs text-purple-300">
                  Plataforma Gamificada
                </p>
              </div>
            </div>

            {/* Page Title (Desktop) */}
            {title && (
              <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-purple-500/30">
                <span className="text-lg font-semibold text-white">{title}</span>
              </div>
            )}
          </div>

          {/* Center Section - Stats (Desktop) */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {/* Streak */}
            {career.currentStreak > 0 && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg px-3 py-1.5"
              >
                <Flame className="w-4 h-4 text-orange-400" />
                <div>
                  <p className="text-[10px] text-orange-300 leading-none">Streak</p>
                  <p className="text-sm font-bold text-white leading-none mt-0.5">
                    {career.currentStreak} dias
                  </p>
                </div>
              </motion.div>
            )}

            {/* Fans */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg px-3 py-1.5"
            >
              <TrendingUp className="w-4 h-4 text-pink-400" />
              <div>
                <p className="text-[10px] text-purple-300 leading-none">Fãs</p>
                <p className="text-sm font-bold text-white leading-none mt-0.5">
                  {career.fans.toLocaleString('pt-BR')}
                </p>
              </div>
            </motion.div>

            {/* Level Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2 bg-gradient-to-br ${levelInfo.color} rounded-lg px-3 py-1.5 shadow-lg`}
            >
              <span className="text-base">{levelInfo.icon}</span>
              <div>
                <p className="text-[10px] text-white/80 leading-none">Nível</p>
                <p className="text-sm font-bold text-white leading-none mt-0.5">
                  {levelInfo.name}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Section - User Info */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            {/* Notifications */}
            {onNotificationsClick && (
              <button
                onClick={onNotificationsClick}
                className="relative p-2 hover:bg-white/10 rounded-lg transition-all group"
              >
                <Bell className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" />
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-orange-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-lg"
                  >
                    {unreadCount}
                  </motion.div>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Stats Bar */}
        <div className="md:hidden mt-3 flex items-center justify-between gap-2">
          {/* Fans */}
          <div className="flex-1 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-purple-300 leading-none">Fãs</p>
                <p className="text-sm font-bold text-white leading-none mt-1">
                  {career.fans.toLocaleString('pt-BR')}
                </p>
              </div>
              <TrendingUp className="w-4 h-4 text-pink-400" />
            </div>
          </div>

          {/* Level */}
          <div className={`flex-1 bg-gradient-to-br ${levelInfo.color} rounded-lg px-3 py-2 shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-white/80 leading-none">Nível</p>
                <p className="text-xs font-bold text-white leading-none mt-1 truncate">
                  {levelInfo.name}
                </p>
              </div>
              <span className="text-lg">{levelInfo.icon}</span>
            </div>
          </div>

          {/* Streak */}
          {career.currentStreak > 0 && (
            <div className="flex-1 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg px-3 py-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-orange-300 leading-none">Streak</p>
                  <p className="text-sm font-bold text-white leading-none mt-1">
                    {career.currentStreak}d
                  </p>
                </div>
                <Flame className="w-4 h-4 text-orange-400" />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Page Title */}
        {title && (
          <div className="lg:hidden mt-3 pb-1">
            <h2 className="text-lg font-bold text-white">{title}</h2>
          </div>
        )}
      </div>
    </motion.header>
  );
}