import React, { ReactElement } from 'react';

import splashImg from '../../images/splash.jpg';

export function BackgroundImage(): ReactElement {
  return (
    <img
      className="background-image"
      src={splashImg}
      alt="peaceful orchids and stacked rocks"
    />
  );
}
