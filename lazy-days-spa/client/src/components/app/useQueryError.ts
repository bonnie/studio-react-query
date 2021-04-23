import { useToast } from '@chakra-ui/react';

import { toastOptions } from '../../constants';

export function useQueryError(): (error: unknown) => void {
  const toast = useToast(toastOptions);

  function queryErrorToast(error: unknown) {
    const title =
      typeof error === 'string' ? error : 'error connecting to server';
    toast({ title, status: 'error' });
  }
  return queryErrorToast;
}
