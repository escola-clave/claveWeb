import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CURRENT_USER, CURRENT_STUDENT_PROFILE, CURRENT_SEASON, CURRENT_CLASS } from '../data/centralizedMocks';
import type { User, StudentProfile } from '../data/types'; // ✅ Importar StudentProfile de types.ts

export interface Season {
  id: string;
  courseId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Class {
  id: string;
  seasonId: string;
  name: string;
  maxStudents: number;
  isActive: boolean;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  studentProfile: StudentProfile | null;
  currentSeason: Season | null;
  currentClass: Class | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updatePassword: (newPassword: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [currentSeason] = useState<Season | null>(CURRENT_SEASON);
  const [currentClass] = useState<Class | null>(CURRENT_CLASS);

  const login = async (email: string, password: string) => {
    // Mock login - simula autenticação
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser(CURRENT_USER);
    if (CURRENT_USER.role === 'STUDENT') { // ✅ Não ARTIST
      setStudentProfile(CURRENT_STUDENT_PROFILE);
    }
  };

  const logout = () => {
    setUser(null);
    setStudentProfile(null);
  };

  const updatePassword = (newPassword: string) => {
    if (user) {
      setUser({ ...user, mustChangePassword: false });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      studentProfile, 
      currentSeason, 
      currentClass, 
      login, 
      logout, 
      updatePassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}