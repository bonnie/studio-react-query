import jsonpatch from 'fast-json-patch';
import { UseMutateFunction, useMutation } from 'react-query';

import type { User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { useUser } from './useUser';

async function patchUserOnServer(
  originalData: User | null,
  newData: User | null,
): Promise<User | null> {
  if (!newData || !originalData) return null;
  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalData, newData);

  // send patched data to the server
  const { data } = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: getJWTHeader(originalData),
    },
  );
  return data.user;
}

export function usePatchUser(): UseMutateFunction<
  User | null,
  unknown,
  User | null,
  unknown
> {
  const { user, updateUser } = useUser();

  const { mutate: patchUser } = useMutation(
    (newData: User | null) => patchUserOnServer(user, newData),
    {
      onSuccess: (userData: User | null) => {
        if (userData) updateUser(userData);
      },
    },
  );

  return patchUser;
}
