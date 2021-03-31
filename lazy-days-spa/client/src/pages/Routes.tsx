import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Book } from './Book';
import { Home } from './Home';
import { Login } from './Login';
import { Treatments } from './Treatments';
import { UserProfile } from './UserProfile';

export function Routes(): ReactElement {
  return (
    <Switch>
      <Route path="/book" component={Book} />
      <Route path="/login" component={Login} />
      <Route path="/treatments" component={Treatments} />
      <Route path="/user/:id" component={UserProfile} />
      <Route path="/" component={Home} />
    </Switch>
  );
}
