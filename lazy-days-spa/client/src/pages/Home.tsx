import React from 'react';
import splashImg from '../../public/splash.jpg';

export default function Home(): React.FC {
  return (
    <div>
      <img className="background-image" src={splashImg} />
    </div>
  );
}