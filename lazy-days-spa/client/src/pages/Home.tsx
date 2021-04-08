import React, { ReactElement } from 'react';

import { BackgroundImage } from './common/BackgroundImage';

export function Home(): ReactElement {
  return (
    <div>
      <BackgroundImage />
      <p
        className="text-center"
        style={{ fontFamily: "'Dancing Script', cursive", fontSize: '8em' }}
      >
        Lazy Days Spa
      </p>
    </div>
  );
}
