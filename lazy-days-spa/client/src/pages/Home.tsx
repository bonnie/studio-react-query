import React, { ReactElement } from 'react';

import splashImg from '../../public/splash.jpg';

export function Home(): ReactElement {
  return (
    <div>
      <img
        className="background-image"
        src={splashImg}
        alt="peaceful orchids and stacked rocks"
      />
    </div>
  );
}
