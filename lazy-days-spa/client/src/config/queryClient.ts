import { createStandaloneToast } from '@chakra-ui/react';
import { QueryClient } from 'react-query';

const toast = createStandaloneToast();

export function queryErrorHandler(error: unknown): void {
  // error is unknown because in js, anything can be an error (e.g. throw(5))
  const title = error instanceof Error ? error : 'error connecting to server';
  toast({ title, status: 'error', variant: 'subtle', isClosable: true });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
    },
  },
});
