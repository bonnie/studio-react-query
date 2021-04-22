import { ChakraProvider } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ProvideAuth } from '../../auth/useAuth';
import { theme } from '../../theme';
import { Loading } from './Loading';
import { Navbar } from './Navbar';
import { Routes } from './Routes';

const queryClient = new QueryClient();

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
