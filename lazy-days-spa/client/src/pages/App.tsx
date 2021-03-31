import React, { ReactElement } from 'react';
import Container from 'react-bootstrap/Container';

import { Loading } from './Loading';
import { SpaNavbar } from './nav/Navbar';
import { Routes } from './Routes';

export function App(): ReactElement {
  return (
    <Container className="App">
      <Loading />
      <SpaNavbar />
      <Routes />
    </Container>
  );
}
