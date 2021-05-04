import axios, { AxiosResponse } from 'axios';
import jsonpatch from 'fast-json-patch';
import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';

import type { User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useUser } from './useUser';

interface AxiosResponseWithCancel extends AxiosResponse {
  cancel: () => void;
}

async function patchUserOnServer(
  originalData: User | null,
  newData: User | null,
): Promise<AxiosResponseWithCancel | null> {
  if (!newData || !originalData) return null;

  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalData, newData);

  // Create a new CancelToken source for this request
  const source = axios.CancelToken.source();

  // send patched data to the server with cancel token and return the promise
  const promise: AxiosResponseWithCancel = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: getJWTHeader(originalData),
      cancelToken: source.token,
    },
  );

  // Cancel the request if React Query calls the `promise.cancel` method
  promise.cancel = () => {
    source.cancel('Query was cancelled by React Query');
  };

  return promise;
}

export function usePatchUser(): UseMutateFunction<
  AxiosResponseWithCancel | null,
  unknown,
  User | null,
  {
    previousUser: User | null | undefined;
  }
> {
  const { user, updateUser } = useUser();
  const queryClient = useQueryClient();

  const { mutate: patchUser } = useMutation(
    (newData: User | null) => patchUserOnServer(user, newData),
    {
      onMutate: async (newData: User | null) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(queryKeys.user);

        // Snapshot the previous value
        const previousUser: User | null | undefined = queryClient.getQueryData(
          queryKeys.user,
        );

        // Optimistically update to the new value
        if (newData) updateUser(newData);

        // Return a context object with the snapshotted value
        return { previousUser };
      },
      // If the mutation fails, use the context returned from onMutate to roll back

      onError: (err, newTodo, context) => {
        console.log('YOU FAILED, YA LOSER!!!');
        console.log('setting user back to', context?.previousUser);
        queryClient.setQueryData(queryKeys.user, context?.previousUser);
      },

      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(queryKeys.user);
      },
    },
  );

  return patchUser;
}
