/* eslint-disable sonarjs/cognitive-complexity */
import React, { ReactElement, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

// eslint-disable-next-line max-lines-per-function
export function Signin(): ReactElement {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [action, setAction] = useState<string>();
  const [validated, setValidated] = useState(false);
  const auth = useAuth();

  if (auth?.user) {
    return <Redirect to={`/user/${auth.user.uid}`} />;
  }

  const onSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || !email || !password) {
      event.stopPropagation();
      return;
    }

    if (action === 'signUp') {
      auth && auth.signup(email, password);
    } else if (action === 'signIn') {
      auth && auth.signin(email, password);
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter email"
        />
        <Form.Control.Feedback type="invalid">
          Please enter an email.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
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
      <Button
        variant="outline"
        type="submit"
        onClick={() => setAction('signup')}
      >
        Sign up
      </Button>
      <Button
        variant="primary"
        type="submit"
        onClick={() => setAction('signin')}
      >
        Sign in
      </Button>
    </Form>
  );
}
