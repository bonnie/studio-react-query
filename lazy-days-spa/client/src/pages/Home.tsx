import React, { ReactElement } from 'react';

import splashImg from '../images/splash.jpg';

export function Home(): ReactElement {
  return (
    <div>
      <img
        className="background-image"
        src={splashImg}
        alt="peaceful orchids and stacked rocks"
      />
      <h1 style={{ textAlign: 'right' }}>Lazy Days Spa</h1>
    </div>
  );
}
