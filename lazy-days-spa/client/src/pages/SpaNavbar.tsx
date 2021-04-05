import { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export function SpaNavbar(): ReactElement {
  const auth = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Lazy Days Spa
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/treatments">
          Treatments
        </Nav.Link>
        <Nav.Link as={Link} to="/book">
          Schedule a treatment
        </Nav.Link>
      </Nav>
      {auth && auth.user ? (
        <>
          <Nav.Link to={`/user/${auth.user.id}`} as={Link}>
            Account ({auth.user.email})
          </Nav.Link>
          <Button onClick={() => auth.signout()}>Sign out</Button>
        </>
      ) : (
        <Link to="/signin">Sign in</Link>
      )}
    </Navbar>
  );
}
