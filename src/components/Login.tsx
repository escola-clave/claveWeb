import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Music2, Guitar, Mic2, Map } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onShowDocs?: () => void;
}

export default function Login({ onShowDocs }: LoginProps) {
  const [email, setEmail] = useState('mari.costa@demo.com'); // ✅ Preenchido para demo
  const [password, setPassword] = useState('demo123'); // ✅ Preenchido para demo
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10"
          animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Music2 className="w-16 h-16 text-purple-500/20" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20"
          animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Guitar className="w-20 h-20 text-indigo-500/20" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-10"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          <Mic2 className="w-14 h-14 text-pink-500/20" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl">
                <Music2 className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">🎭🎸 Clave de Sales</h1>
            <p className="text-purple-200">Plataforma de Carreira Artística</p>
            <p className="text-sm text-purple-300 mt-1">Música & Teatro</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30"
            >
              {loading ? 'Entrando...' : 'Entrar no Palco'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-purple-300">
            <p>Primeiro acesso? Você será solicitado a trocar a senha.</p>
          </div>

          {onShowDocs && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onShowDocs}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-purple-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 transition-all duration-200"
              >
                <Map className="w-4 h-4" />
                Mapa de Telas (Design Doc)
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 text-center text-xs text-purple-400">
          <p className="italic">"Você apareceu hoje para a sua carreira?"</p>
        </div>
      </motion.div>
    </div>
  );
}
