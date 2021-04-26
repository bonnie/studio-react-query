import { ChakraProvider } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ProvideAuth } from '../../auth/useAuth';
import { queryClient } from '../../config/queryClient';
import { theme } from '../../theme';
import { Loading } from './Loading';
import { Navbar } from './Navbar';
import { Routes } from './Routes';

export function App(): ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <ProvideAuth>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Loading />
          <Routes />
          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
        </QueryClientProvider>
      </ProvideAuth>
    </ChakraProvider>
  );
}
