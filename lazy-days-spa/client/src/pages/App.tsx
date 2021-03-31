import React, { ReactElement } from 'react';
import Container from 'react-bootstrap/Container';

import { Loading } from './Loading';
import { Routes } from './Routes';
import { SpaNavbar } from './SpaNavbar';

export function App(): ReactElement {
  return (
    <Container className="App">
      <Loading />
      <SpaNavbar />
      <Routes />
    </Container>
  );
}
