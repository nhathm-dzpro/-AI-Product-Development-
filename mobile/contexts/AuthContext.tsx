import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { setAuthToken } from '../services/api';
import { MOCK_USER } from '../constants/mock';
import type { User } from '../types';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock auth foundation: no backend call yet. Phase 2 plugs authService here.
  const signIn = useCallback(async (_email: string, _password: string) => {
    setIsLoading(true);
    try {
      const mockToken = 'mock-token';
      setAuthToken(mockToken);
      setToken(mockToken);
      setUser(MOCK_USER);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = useCallback(async (name: string, email: string, _password: string) => {
    setIsLoading(true);
    try {
      const mockToken = 'mock-token';
      setAuthToken(mockToken);
      setToken(mockToken);
      setUser({ ...MOCK_USER, name, email });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    setAuthToken(null);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, isLoading, signIn, signUp, signOut }),
    [user, token, isLoading, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
