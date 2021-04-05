// Adapted from https://usehooks.com/useAuth/
// Easy to understand React Hook recipes by Gabe Ragland
import React, { createContext, useContext, useState } from 'react';

import { User } from '../../../shared/types';
import { axiosInstance } from '../axiosInstance';
import { USER_LOCALSTORAGE_KEY } from '../constants';

interface Auth {
  user: User | null;
  error: string | null;
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
export const useAuth = (): Auth | null => {
  return useContext(authContext);
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

  const [user, setUser] = useState<User | null>(getStoredUser());
  const [error, setError] = useState<string | null>(null);

  async function serverCall(
    urlEndpoint: string,
    email: string,
    password: string,
  ): Promise<void> {
    try {
      setError(null);
      const response = await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: { email, password },
        headers: { 'Content-Type': 'application/json' },
      });
      setUser(response.data.user);
      console.log('(*(*(*(*(*( USER', response.data.user);
      if (response?.data?.user?.token)
        localStorage.setItem(USER_LOCALSTORAGE_KEY, response.data.user);
    } catch (errorResponse) {
      console.log('*(*(*(*(*(*( ERROR RESPONSE', errorResponse);
      setError(errorResponse?.data?.message || SERVER_ERROR);
    }
  }

  async function signin(email: string, password: string): Promise<void> {
    serverCall('/signin', email, password);
  }
  async function signup(email: string, password: string): Promise<void> {
    serverCall('/user', email, password);
  }

  // remove user from state and localStorage
  function signout(): void {
    setError(null);
    setUser(null);
    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
  }

  // Return the user object and auth methods
  return {
    user,
    error,
    signin,
    signup,
    signout,
  };
}
