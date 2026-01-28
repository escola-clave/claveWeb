import React from 'react';
import { ArrowLeft, Bell, Radio, Mic, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { TEXTS } from '../constants';
import { parseDeepLink } from '../utils/deeplink';
import type { Notification } from '../data/types'; // ✅ Importar de types.ts

type ViewType = 'palco' | 'rotina' | 'projetos' | 'estudio' | 'carreira' | 'social' | 'imprensa';

interface NotificacoesProps {
  onBack: () => void;
  onNavigate: (view: ViewType, params?: any) => void;
  notifications: Notification[];
}

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} ${TEXTS.TIME.DAYS} ${TEXTS.TIME.AGO}`;
  } else if (hours > 0) {
    return `${hours} ${TEXTS.TIME.HOURS} ${TEXTS.TIME.AGO}`;
  } else if (minutes > 0) {
    return `${minutes} ${TEXTS.TIME.MINUTES} ${TEXTS.TIME.AGO}`;
  } else {
    return 'agora mesmo';
  }
}

function getNotificationIcon(type: string) {
  switch (type) {
    case 'TOUR_REMINDER':
      return Radio;
    case 'REVIEW_RECEIVED':
    case 'PRESS_UNLOCKED':
      return Mic;
    default:
      return Bell;
  }
}

export default function Notificacoes({ onBack, onNavigate, notifications }: NotificacoesProps) {
  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  const handleNotificationClick = (notification: Notification) => {
    // Parsear deeplink do backend
    const deepLinkContext = parseDeepLink(notification);
    
    // Navegar com contexto completo
    onNavigate(deepLinkContext.view, deepLinkContext.params);
    
    // TODO: Marcar notificação como lida via API
    // await ApiService.markNotificationAsRead(notification.id);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <Bell className="w-7 h-7 text-purple-400" />
              Notificações
            </h1>
            <p className="text-purple-300">
              {unreadNotifications.length} não lida{unreadNotifications.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Notificações Não Lidas */}
        {unreadNotifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-lg font-bold text-white mb-4">Novas</h2>
            <div className="space-y-3">
              {unreadNotifications.map((notif, index) => {
                const Icon = getNotificationIcon(notif.type);
                const isUrgent = notif.type === 'TOUR_REMINDER';

                return (
                  <motion.button
                    key={notif.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNotificationClick(notif)}
                    className={`w-full text-left backdrop-blur-lg rounded-xl p-5 border transition-all ${
                      isUrgent
                        ? 'bg-red-500/20 border-red-500/50 hover:bg-red-500/30'
                        : 'bg-blue-500/20 border-blue-500/50 hover:bg-blue-500/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${
                        isUrgent ? 'bg-red-500/30' : 'bg-blue-500/30'
                      }`}>
                        {isUrgent ? (
                          <AlertCircle className="w-6 h-6 text-red-300" />
                        ) : (
                          <Icon className="w-6 h-6 text-blue-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white mb-1">{notif.title}</h3>
                        <p className="text-sm text-white/90 mb-2">{notif.message}</p>
                        <p className="text-xs text-white/60 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimestamp(new Date(notif.createdAt))}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Notificações Lidas */}
        {readNotifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              Anteriores
              <CheckCircle className="w-5 h-5 text-green-400" />
            </h2>
            <div className="space-y-3">
              {readNotifications.map((notif, index) => {
                const Icon = getNotificationIcon(notif.type);

                return (
                  <motion.button
                    key={notif.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    onClick={() => handleNotificationClick(notif)}
                    className="w-full text-left bg-white/5 hover:bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/10 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-white/10">
                        <Icon className="w-6 h-6 text-purple-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white/80 mb-1">{notif.title}</h3>
                        <p className="text-sm text-white/60 mb-2">{notif.message}</p>
                        <p className="text-xs text-white/40 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimestamp(new Date(notif.createdAt))}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Estado Vazio */}
        {unreadNotifications.length === 0 && readNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Bell className="w-12 h-12 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Nenhuma notificação
            </h2>
            <p className="text-purple-300">
              Quando algo importante acontecer, você será avisado aqui!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}