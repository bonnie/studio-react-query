import { HStack } from '@chakra-ui/react';
import { ReactElement } from 'react';

import { Staff } from './Staff';
import { useStaff } from './useStaff';

export function AllStaff(): ReactElement {
  // replace with data from React Query
  const { staff } = useStaff();
  return (
    <HStack m={10} spacing={8} justify="center">
      {staff.map((staffData) => (
        <Staff key={staffData.id} staffData={staffData} />
      ))}
    </HStack>
  );
}
