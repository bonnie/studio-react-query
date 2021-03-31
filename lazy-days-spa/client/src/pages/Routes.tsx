import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Book } from './Book';
import { Home } from './Home';
import { Signin } from './Signin';
import { Treatments } from './Treatments';
import { UserProfile } from './UserProfile';

export function Routes(): ReactElement {
  return (
    <Switch>
      <Route path="/book" component={Book} />
      <Route path="/treatments" component={Treatments} />
      <Route path="/signin" component={Signin} />
      <Route path="/user/:id" component={UserProfile} />
      <Route path="/" component={Home} />
    </Switch>
  );
}
