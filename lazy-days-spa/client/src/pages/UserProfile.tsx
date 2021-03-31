import React, { ReactElement } from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export function UserProfile(): ReactElement {
  const auth = useAuth();

  if (!auth?.user) {
    return <Redirect to="/signin" />;
  }

  return <div />;
}
