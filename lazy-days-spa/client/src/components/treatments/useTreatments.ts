import { useQuery } from 'react-query';

import type { Treatment } from '../../../../shared/types';
import { axiosInstance } from '../../axiosInstance';

async function getTreatments() {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

interface UseTreatments {
  treatments: Treatment[];
}
export function useTreatments(): UseTreatments {
  const placeholderData: Treatment[] = [];
  const { data } = useQuery('treatments', getTreatments);
  return {
    treatments: data ?? placeholderData,
  };
}
