import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Schedule } from '../appointments/Schedule';
import { Treatments } from '../treatments/Treatments';
import { Signin } from '../user/Signin';
import { UserProfile } from '../user/UserProfile';
import { Home } from './Home';

export function Routes(): ReactElement {
  return (
    <Switch>
      <Route path="/schedule" component={Schedule} />
      <Route path="/treatments" component={Treatments} />
      <Route path="/signin" component={Signin} />
      <Route path="/user/:id" component={UserProfile} />
      <Route path="/" component={Home} />
    </Switch>
  );
}
