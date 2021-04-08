/* eslint-disable sonarjs/cognitive-complexity */
import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { BackgroundImage } from './common/BackgroundImage';
import { StyledToast } from './common/StyledToast';

// eslint-disable-next-line max-lines-per-function
export function Signin(): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [action, setAction] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();

  if (auth === null) {
    throw new Error('useAuth being called outside Provider');
  }

  if (auth.user) {
    return <Redirect to={`/user/${auth.user.id}`} />;
  }

  const errorMessage = auth.error || error;

  const onSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ) => {
    event.preventDefault();
    setError('');

    if (!email) {
      setError('please enter an email');
      return;
    }

    if (!password) {
      setError('please enter a password');
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
      <StyledToast
        title={null}
        message={errorMessage}
        isOpen={!!errorMessage}
      />
    </Container>
  );
}
