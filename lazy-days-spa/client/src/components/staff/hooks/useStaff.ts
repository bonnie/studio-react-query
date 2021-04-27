import { useQuery } from 'react-query';

import type { Staff } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';

// for when we need a query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

interface UseStaff {
  staff: Staff[];
}
export function useStaff(): UseStaff {
  const placeholderData: Staff[] = [];
  const { data } = useQuery('staff', getStaff);
  return {
    staff: data ?? placeholderData,
  };
}
