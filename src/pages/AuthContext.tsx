import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";

interface AuthContextType {
  principal: Principal | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [principal, setPrincipal] = useState<Principal | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        const identity = authClient.getIdentity();
        setPrincipal(identity.getPrincipal());
      }
    };
    checkLoginStatus();
  }, []);

  const login = async () => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        setPrincipal(identity.getPrincipal());
      },
      onError: (err) => console.error("Login failed:", err),
    });
  };

  const logout = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout();
    setPrincipal(null); 
  };

  return (
    <AuthContext.Provider value={{ principal, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
