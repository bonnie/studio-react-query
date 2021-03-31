import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

export function UserProfile(): ReactElement {
  const { id } = useParams();

  return <div />;
}
