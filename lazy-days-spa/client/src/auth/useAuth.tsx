import { useQueryClient } from 'react-query';

import { axiosInstance } from '../axiosInstance';
import { useCustomToast } from '../components/app/hooks/useCustomToast';
import { queryKeys } from '../react-query/constants';
import { deleteStoredUser, setStoredUser } from './utils';

interface UseAuth {
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => void;
}

export function useAuth(): UseAuth {
  const SERVER_ERROR = 'There was an error contacting the server.';
  const toast = useCustomToast();
  const queryClient = useQueryClient();

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
        queryClient.setQueryData(queryKeys.user, data.user);
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
    // invalidate user data in React Query client
    queryClient.invalidateQueries(queryKeys.user);
    deleteStoredUser();
  }

  // Return the user object and auth methods
  return {
    signin,
    signup,
    signout,
  };
}
