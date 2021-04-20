import React, { ReactElement } from 'react';
import Container from 'react-bootstrap/Container';

import { useToast } from '../../hooks/useToast';
import { Loading } from './Loading';
import { Routes } from './Routes';
import { SpaNavbar } from './SpaNavbar';

export function App(): ReactElement {
  const { Toast } = useToast();
  return (
    <>
      <SpaNavbar />
      <Container className="App">
        <Loading />
        <Toast />
        <Routes />
      </Container>
    </>
  );
}
