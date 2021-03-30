import React from 'react';
import "./App.css";
import Container from 'react-bootstrap/Container'

import Navbar from './Navbar';

export default function App(): React.FC {
  return (<Container className="App">
    <Navbar />
    <Routes />
  </Container>);
}
