import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import type { User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from '../../../user-storage';

async function getUser(userId: number | undefined): Promise<User | null> {
  const source = axios.CancelToken.source();

  if (!userId) return null;
  const axiosResponsePromise = axiosInstance.get(`/user/${userId}`, {
    headers: getJWTHeader(),
    cancelToken: source.token,
  });

  // Cancel the request if React Query calls the `promise.cancel` method
  // @ts-expect-error (cancel doesn't exist on axiosResponsePromise)
  axiosResponsePromise.cancel = () => {
    source.cancel('Query was cancelled by React Query');
  };

  return (await axiosResponsePromise).data.user;
}

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const queryClient = useQueryClient();

  // update user data from server
  useQuery(queryKeys.user, () => getUser(user?.id), {
    enabled: !!user?.id,
    onSuccess: (data) => setUser(data),
  });

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    // set user in state
    setUser(newUser);

    // update user in localstorage
    setStoredUser(newUser);

    // pre-populate user profile in React Query client
    queryClient.setQueryData(queryKeys.user, newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    // update state
    setUser(null);

    // remove from localstorage
    clearStoredUser();

    // remove from query client
    queryClient.setQueryData(queryKeys.user, null);
  }

  return { user, updateUser, clearUser };
}
