/**
 * Funções utilitárias reutilizáveis
 */

// Formatação de números
export function formatNumber(num: number): string {
  return num.toLocaleString('pt-BR');
}

export function formatCurrency(num: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(num);
}

export function abbreviateNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

// Formatação de datas
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} ano${years > 1 ? 's' : ''} atrás`;
  } else if (months > 0) {
    return `${months} mês${months > 1 ? 'es' : ''} atrás`;
  } else if (weeks > 0) {
    return `${weeks} semana${weeks > 1 ? 's' : ''} atrás`;
  } else if (days > 0) {
    return `${days} dia${days > 1 ? 's' : ''} atrás`;
  } else if (hours > 0) {
    return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
  } else if (minutes > 0) {
    return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
  } else {
    return 'Agora';
  }
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Validações
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Manipulação de strings
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Arrays
export function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

// Utilitários de gamificação
export function calculateLevel(fans: number): {
  level: string;
  icon: string;
  color: string;
  nextLevel: string;
  fansToNext: number;
  progress: number;
} {
  const levels = [
    { min: 0, max: 500, name: 'SHOWER', displayName: 'Artista de Chuveiro', icon: '🚿', color: 'from-gray-400 to-gray-500' },
    { min: 500, max: 2000, name: 'GARAGE', displayName: 'Garagem', icon: '🏠', color: 'from-indigo-500 to-indigo-600' },
    { min: 2000, max: 5000, name: 'UNDERGROUND', displayName: 'Underground', icon: '🎸', color: 'from-purple-500 to-purple-600' },
    { min: 5000, max: 10000, name: 'INDIE', displayName: 'Indie', icon: '🎤', color: 'from-pink-500 to-pink-600' },
    { min: 10000, max: 20000, name: 'RISING_STAR', displayName: 'Estrela em Ascensão', icon: '⭐', color: 'from-orange-500 to-yellow-500' },
    { min: 20000, max: 50000, name: 'HEADLINER', displayName: 'Atração Principal', icon: '🌟', color: 'from-yellow-500 to-yellow-600' },
    { min: 50000, max: Infinity, name: 'MAIN_STAGE', displayName: 'Palco Principal', icon: '👑', color: 'from-yellow-400 to-yellow-500' },
  ];

  const currentLevel = levels.find(l => fans >= l.min && fans < l.max) || levels[0];
  const currentIndex = levels.indexOf(currentLevel);
  const nextLevel = levels[currentIndex + 1] || currentLevel;

  const fansInLevel = fans - currentLevel.min;
  const fansNeeded = currentLevel.max - currentLevel.min;
  const progress = Math.min((fansInLevel / fansNeeded) * 100, 100);

  return {
    level: currentLevel.name,
    icon: currentLevel.icon,
    color: currentLevel.color,
    nextLevel: nextLevel.displayName,
    fansToNext: Math.max(0, nextLevel.min - fans),
    progress,
  };
}

export function calculateStreakBonus(streak: number): number {
  if (streak >= 30) return 100;
  if (streak >= 14) return 50;
  if (streak >= 7) return 25;
  return 0;
}

// Utilitários de performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Local storage
export function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function getStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
}

export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}

// Cores aleatórias para avatars
export function getAvatarColor(seed: string): string {
  const colors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-pink-500 to-rose-500',
  ];
  
  const hash = seed.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
}

// Copy to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
}

// Download file
export function downloadFile(url: string, filename: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Class names utility
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
