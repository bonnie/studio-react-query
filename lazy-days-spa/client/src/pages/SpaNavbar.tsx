import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export function SpaNavbar(): ReactElement {
  const auth = useAuth();

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
      {auth && auth.user ? (
        <>
          <Link to={`/user/${auth.user.uid}`} component={Nav.Link}>
            Account ({auth.user.email})
          </Link>
          <Button onClick={() => auth.signout()}>Sign out</Button>
        </>
      ) : (
        <Link to="/signin">Sign in</Link>
      )}
    </Navbar>
  );
}
