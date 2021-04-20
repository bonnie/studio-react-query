import { Container } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

export function Treatments(): ReactElement {
  // replace with data from React Query
  const treatments = [];
  return (
    <Container>
      {treatments.map((tData) => (
        <div />
      ))}
    </Container>
  );
}
