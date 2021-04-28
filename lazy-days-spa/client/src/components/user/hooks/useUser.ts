import { useState } from 'react';
import { useQuery } from 'react-query';

import type { User } from '../../../../../shared/types';
import { getStoredUser } from '../../../auth/utils';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';

async function getUser(userId: number | undefined): Promise<User | null> {
  if (userId) {
    const { data } = await axiosInstance.get(`/users/$userId`);
    return data.user;
  }
  return Promise.resolve(null);
}

interface UseUser {
  user: User | null;
  updateUser: (userData: User | null) => void;
}

function fakeUpdateFunction(userData: User | null) {
  // placeholder before ReactQuery
}

export function useUser(): UseUser {
  const [user, setUser] = useState(getStoredUser());

  const { data } = useQuery(queryKeys.user, () => getUser(user?.id));
  return { user, updateUser: fakeUpdateFunction };
}
