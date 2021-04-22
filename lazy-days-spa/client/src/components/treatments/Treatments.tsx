import { HStack } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

import { Treatment } from './Treatment';
import { useTreatments } from './useTreatments';

export function Treatments(): ReactElement {
  // replace with data from React Query
  const { treatments } = useTreatments();
  return (
    <HStack m={10} spacing={8} justify="center">
      {treatments.map((treatmentData) => (
        <Treatment key={treatmentData.id} treatmentData={treatmentData} />
      ))}
    </HStack>
  );
}
