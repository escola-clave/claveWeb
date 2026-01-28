import React from 'react';
import { Music, Album, Headphones, Trophy, Users, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { useArtist } from './ArtistContext';
import { MOCK_NOTIFICATIONS } from '../data/mockData';

interface BottomNavProps {
  currentView: 'palco' | 'rotina' | 'projetos' | 'estudio' | 'carreira' | 'imprensa' | 'social' | 'notificacoes';
  onNavigate: (view: 'rotina' | 'projetos' | 'estudio' | 'carreira' | 'social') => void;
}

export default function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  const { career, trackProgress } = useArtist();
  
  // ✅ Verificação de segurança
  if (!career) return null;
  
  // Verificar se tem coletiva pendente (todas as faixas completas)
  const allTracksCompleted = trackProgress.every(t => t.status === 'COMPLETED');
  const hasPressConference = allTracksCompleted;
  
  // Verificar se tem streak ativo
  const hasActiveStreak = career.currentStreak > 0;
  
  // Contar notificações não lidas
  const unreadNotifications = MOCK_NOTIFICATIONS.filter(n => !n.readAt).length;

  const navItems = [
    {
      id: 'rotina',
      label: 'Rotina',
      icon: Music,
      badge: hasActiveStreak,
      badgeContent: <Flame className="w-3 h-3 text-orange-400" />,
      badgeColor: 'from-orange-500 to-red-500'
    },
    {
      id: 'projetos',
      label: 'Projetos',
      icon: Album,
      badge: false
    },
    {
      id: 'estudio',
      label: 'Estúdio',
      icon: Headphones,
      badge: hasPressConference,
      badgeContent: '📰',
      badgeColor: 'from-red-500 to-orange-500'
    },
    {
      id: 'carreira',
      label: 'Carreira',
      icon: Trophy,
      badge: false
    },
    {
      id: 'social',
      label: 'Social',
      icon: Users,
      badge: unreadNotifications > 0,
      badgeContent: unreadNotifications,
      badgeColor: 'from-purple-500 to-pink-500'
    }
  ] as const;

  return (
    <>
      {/* Spacer para não sobrepor conteúdo */}
      <div className="h-20 md:hidden" />
      
      {/* Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      >
        <div className="bg-gradient-to-t from-black/95 via-purple-950/95 to-purple-900/95 backdrop-blur-xl border-t border-purple-500/30 shadow-lg shadow-purple-500/20">
          <div className="flex items-center justify-around px-2 py-2">
            {navItems.map((item) => {
              const isActive = currentView === item.id || (item.id === 'estudio' && currentView === 'imprensa');
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as 'rotina' | 'projetos' | 'estudio' | 'carreira' | 'social')}
                  className="relative flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all min-w-[60px]"
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-xl"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  {/* Icon Container */}
                  <div className="relative">
                    <div className={`p-2 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50' 
                        : 'bg-white/5'
                    }`}>
                      <Icon className={`w-5 h-5 transition-colors ${
                        isActive ? 'text-white' : 'text-purple-300'
                      }`} />
                    </div>
                    
                    {/* Badge */}
                    {item.badge && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-gradient-to-br ${
                          item.badgeColor || 'from-red-500 to-orange-500'
                        } flex items-center justify-center text-[10px] font-bold text-white shadow-lg px-1`}
                      >
                        {item.badgeContent}
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Label */}
                  <span className={`text-[10px] font-semibold mt-1 transition-colors relative z-10 ${
                    isActive ? 'text-white' : 'text-purple-300'
                  }`}>
                    {item.label}
                  </span>
                  
                  {/* Active dot */}
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavDot"
                      className="absolute -bottom-1 w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Safe area for iOS */}
        <div className="bg-gradient-to-t from-black to-purple-950 h-safe-area-inset-bottom" />
      </motion.nav>
    </>
  );
}
