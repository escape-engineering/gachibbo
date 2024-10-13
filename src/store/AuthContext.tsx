import { createContext } from 'react';
import useAuthStore from './useAuthStore';

export const AuthContext = createContext<ReturnType<typeof useAuthStore> | null>(null);
