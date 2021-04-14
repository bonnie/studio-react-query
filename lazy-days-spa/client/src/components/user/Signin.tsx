/* eslint-disable sonarjs/cognitive-complexity */
import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { BackgroundImage } from '../common/BackgroundImage';

// eslint-disable-next-line max-lines-per-function
export function Signin(): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [action, setAction] = useState('');
  const auth = useAuth();
  const { showToast } = useToast();

  if (auth.user) {
    return <Redirect to={`/user/${auth.user.id}`} />;
  }

  const onSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ) => {
    event.preventDefault();

    if (!email) {
      showToast('please enter an email');
      return;
    }

    if (!password) {
      showToast('please enter a password');
      return;
    }

    if (action === 'signup') {
      auth.signup(email, password);
    } else if (action === 'signin') {
      auth.signin(email, password);
    }
  };

  return (
    <Container className="mt-5">
      <BackgroundImage />
      <Form noValidate onSubmit={onSubmit}>
        <Form.Group controlId="formBasicEmail" style={{ maxWidth: 400 }}>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email"
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicPassword" style={{ maxWidth: 400 }}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
          <Form.Control.Feedback type="invalid">
            Please enter a password.
          </Form.Control.Feedback>
        </Form.Group>
        <div style={{ maxWidth: 400, textAlign: 'right' }}>
          <Button
            variant="outline"
            type="submit"
            onClick={() => setAction('signup')}
          >
            Sign up
          </Button>
          <Button
            variant="green"
            type="submit"
            onClick={() => setAction('signin')}
          >
            Sign in
          </Button>
        </div>
      </Form>
    </Container>
  );
}
