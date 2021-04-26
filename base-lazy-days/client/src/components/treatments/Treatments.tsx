import { Box, Heading, HStack } from '@chakra-ui/react';
import { ReactElement } from 'react';

import { Treatment } from './Treatment';
import { useTreatments } from './useTreatments';

export function Treatments(): ReactElement {
  // replace with data from React Query
  const treatments = useTreatments();
  return (
    <Box>
      <Heading mt={10} align="center">
        Available Treatments
      </Heading>
      <HStack m={10} spacing={8} justify="center">
        {treatments.map((treatmentData) => (
          <Treatment key={treatmentData.id} treatmentData={treatmentData} />
        ))}
      </HStack>
    </Box>
  );
}
