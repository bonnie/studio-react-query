import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import type { User } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { clearStoredUser, getStoredUser, setStoredUser } from './utils';

async function getUser(userId: number | undefined): Promise<User | null> {
  if (!userId) return null;
  const { data } = await axiosInstance.get(`/user/${userId}`);
  return data.user;
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
    queryClient.invalidateQueries(queryKeys.user);
  }

  return { user, updateUser, clearUser };
}
