import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginCustomer, registerCustomer, getCustomerData, getStoredCartId, updateCartBuyerIdentity } from '../lib/shopify';

interface CustomerContextType {
  token: string | null;
  customer: any | null;
  isAuthOpen: boolean;
  loading: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, first: string, last: string) => Promise<void>;
  logout: () => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [customer, setCustomer] = useState<any | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('aarth_customer_token');
    if (savedToken) {
      setToken(savedToken);
      fetchCustomer(savedToken);
    }
  }, []);

  const fetchCustomer = async (accessToken: string) => {
    try {
      const data = await getCustomerData(accessToken);
      setCustomer(data);
      
      // Attempt to link current anonymous cart to the logged-in customer
      const cartId = getStoredCartId();
      if (cartId) {
        await updateCartBuyerIdentity(cartId, accessToken);
      }
    } catch (err) {
      console.error("Session expired or invalid:", err);
      logout();
    }
  };

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const newToken = await loginCustomer(email, pass);
      localStorage.setItem('aarth_customer_token', newToken);
      setToken(newToken);
      await fetchCustomer(newToken);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, pass: string, first: string, last: string) => {
    setLoading(true);
    try {
      await registerCustomer(email, pass, first, last);
      // Auto-login after successful registration
      await login(email, pass);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('aarth_customer_token');
    setToken(null);
    setCustomer(null);
  };

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  return (
    <CustomerContext.Provider value={{
      token, customer, isAuthOpen, loading, openAuth, closeAuth, login, register, logout
    }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const ctx = useContext(CustomerContext);
  if (!ctx) throw new Error("useCustomer must be used within CustomerProvider");
  return ctx;
};
