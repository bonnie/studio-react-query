import { createStandaloneToast } from '@chakra-ui/react';
import { QueryClient } from 'react-query';

const toast = createStandaloneToast();

export function queryErrorHandler(error: unknown): void {
  const title =
    typeof error === 'string' ? error : 'error connecting to server';
  toast({ title, status: 'error', variant: 'subtle', isClosable: true });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
    },
  },
});
