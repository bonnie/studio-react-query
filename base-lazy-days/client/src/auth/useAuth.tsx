import { createContext, useContext } from 'react';

import { axiosInstance } from '../axiosInstance';
import { useCustomToast } from '../components/app/hooks/useCustomToast';
import { deleteStoredUser, setStoredUser } from './utils';

interface Auth {
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

// Provider hook that creates auth object and handles state
// eslint-disable-next-line max-lines-per-function
function useProvideAuth(): Auth {
  const SERVER_ERROR = 'There was an error contacting the server.';
  const toast = useCustomToast();

  async function authServerCall(
    urlEndpoint: string,
    email: string,
    password: string,
  ): Promise<void> {
    try {
      const { data, status } = await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: { email, password },
        headers: { 'Content-Type': 'application/json' },
      });

      if (status === 400) {
        toast({ title: data.message, status: 'warning' });
        return;
      }

      if (data?.user?.token) {
        // add user to local storage
        setStoredUser(data.user);

        toast({
          title: `Logged in as ${data.user.email}`,
          status: 'info',
        });
        // TODO: pre-populate user profile in React Query client
      }
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

  function signout(): void {
    // TODO: invalidate user data in React Query client
    deleteStoredUser();
  }

  // Return the user object and auth methods
  return {
    signin,
    signup,
    signout,
  };
}
