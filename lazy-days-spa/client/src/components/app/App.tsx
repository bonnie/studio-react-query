import { Box, ChakraProvider } from '@chakra-ui/react';
import { ReactElement } from 'react';

import { ProvideAuth } from '../../auth/useAuth';
import { theme } from '../../theme';
import { Loading } from './Loading';
import { Navbar } from './Navbar';
import { Routes } from './Routes';

export function App(): ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <ProvideAuth>
        <Navbar />
        <Box>
          <Loading />
          <Routes />
        </Box>
      </ProvideAuth>
    </ChakraProvider>
  );
}
