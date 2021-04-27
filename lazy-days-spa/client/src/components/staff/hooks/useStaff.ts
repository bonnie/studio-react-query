import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useQuery } from 'react-query';

import type { Staff } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { filterByTreatment } from '../utils';

// for when we need a query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

interface UseStaff {
  staff: Staff[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}
export function useStaff(): UseStaff {
  const [filter, setFilter] = useState('all');

  const selectFn = useCallback(
    (unfilteredStaff) => filterByTreatment(unfilteredStaff, filter),
    [filter],
  );

  const placeholderData: Staff[] = [];
  const { data = placeholderData } = useQuery('staff', getStaff, {
    select: filter !== 'all' ? selectFn : undefined,
  });
  return {
    staff: data,
    filter,
    setFilter,
  };
}
