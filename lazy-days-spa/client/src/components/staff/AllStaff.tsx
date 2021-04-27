import { Box, Heading, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import { ReactElement, useState } from 'react';

import { useTreatments } from '../treatments/hooks/useTreatments';
import { useStaff } from './hooks/useStaff';
import { Staff } from './Staff';

export function AllStaff(): ReactElement {
  // for filtering staff by treatment
  const [filter, setFilter] = useState('all');

  // replace with data from React Query
  const { staff } = useStaff();
  const { treatments } = useTreatments();

  return (
    <Box>
      <Heading mt={10} align="center">
        Our Staff
      </Heading>
      <HStack m={10} spacing={8} justify="center">
        {staff.map((staffData) => (
          <Staff key={staffData.id} staffData={staffData} />
        ))}
      </HStack>
      <RadioGroup onChange={setFilter} value={filter}>
        <HStack my={10} spacing={8} justify="center">
          <Heading size="md">Filter by treatment:</Heading>
          <Radio value="all">All</Radio>
          {treatments.map((t) => (
            <Radio key={t.id} value={t.name}>
              {t.name}
            </Radio>
          ))}
        </HStack>
      </RadioGroup>
    </Box>
  );
}
