import { useState } from 'react';
import { useQuery } from 'react-query';

import type { User } from '../../../../../shared/types';
import { getStoredUser } from '../../../auth/utils';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';

async function getUser(userId: number | undefined): Promise<User | null> {
  if (!userId) return null;
  const { data } = await axiosInstance.get(`/users/$userId`);
  return data.user;
}

interface UseUser {
  user: User | null;
}

export function useUser(): UseUser {
  const [user, setUser] = useState<User | null>(getStoredUser());

  useQuery(queryKeys.user, () => getUser(user?.id), {
    enabled: !!user?.id,
    onSuccess: (data) => setUser(data),
  });

  return { user };
}
