import React, { ReactElement } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import { NavbarUser } from './NavbarUser';

export function SpaNavbar(): ReactElement {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Lazy Days Spa</Navbar.Brand>
      <Nav className="mr-auto">
        <Link component={Nav.Link} path="/">
          Home
        </Link>
        <Link component={Nav.Link} path="/treatments">
          Treatments
        </Link>
        <Link component={Nav.Link} path="/book">
          Schedule a treatment
        </Link>
      </Nav>
      <NavbarUser />
    </Navbar>
  );
}
