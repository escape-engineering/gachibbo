import { PropsWithChildren } from 'react';
import { useAuthStore } from './useAuthStore';
import { AuthContext } from './AuthContext';

type AuthProviderProps = PropsWithChildren<{}>;

function AuthProvider({ children }: AuthProviderProps) {
  const authStore = useAuthStore();

  return <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
