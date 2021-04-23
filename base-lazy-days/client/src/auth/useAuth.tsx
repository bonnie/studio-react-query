// Adapted from https://usehooks.com/useAuth/
// Easy to understand React Hook recipes by Gabe Ragland
import { useCustomToast } from '../components/app/useCustomToast';
import React, { createContext, useContext, useState } from 'react';

import { User } from '../../../shared/types';
import { axiosInstance } from '../axiosInstance';
import { USER_LOCALSTORAGE_KEY } from '../constants';

interface Auth {
  user: User | null;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => void;
}

const authContext = createContext<Auth | null>(null);

interface ProvideAuthProps {
  children: React.ReactNode;
}

// Provider component that wraps your app and makes auth object,
// available to any child component that calls useAuth().
export function ProvideAuth({
  children,
}: ProvideAuthProps): React.ReactElement {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object,
// and re-render when it changes.
export const useAuth = (): Auth => {
  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  const context = useContext(authContext);
  if (!context) {
    throw new Error('useAuth is missing context');
  }
  return context;
};

// helper to get user from localstorage
function getStoredUser(): User | null {
  const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

// Provider hook that creates auth object and handles state
// eslint-disable-next-line max-lines-per-function
function useProvideAuth(): Auth {
  const SERVER_ERROR = 'There was an error contacting the server.';
  const toast = useCustomToast();

  const [user, setUser] = useState<User | null>(getStoredUser());

  async function authServerCall(
    urlEndpoint: string,
    email: string,
    password: string,
  ): Promise<void> {
    try {
      const response = await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: { email, password },
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 400) {
        toast({ title: response.data.message, status: 'warning' });
        return;
      }

      setUser(response.data.user);
      if (response?.data?.user?.token) {
        localStorage.setItem(
          USER_LOCALSTORAGE_KEY,
          JSON.stringify(response.data.user),
        );
        toast({
          title: `Logged in as ${response.data.user.email}`,
          status: 'info',
        });
      }
      // TODO: prefetch user profile
    } catch (errorResponse) {
      toast({
        title: errorResponse?.response?.data?.message || SERVER_ERROR,
        status: 'error',
      });
    }
  }

  async function signin(email: string, password: string): Promise<void> {
    authServerCall('/signin', email, password);
  }
  async function signup(email: string, password: string): Promise<void> {
    authServerCall('/user', email, password);
  }

  // remove user from state and localStorage
  function signout(): void {
    // TODO: invalidate cached user profile
    setUser(null);
    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
  }

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
  };
}
