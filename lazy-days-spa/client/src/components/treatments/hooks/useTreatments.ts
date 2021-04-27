import { useQuery, useQueryClient } from 'react-query';

import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';

const TREATMENTS_QUERY_KEY = 'treatments';

async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

interface UseTreatments {
  treatments: Treatment[];
}
export function useTreatments(): UseTreatments {
  const placeholderData: Treatment[] = [];
  const { data } = useQuery(TREATMENTS_QUERY_KEY, getTreatments);
  return {
    treatments: data ?? placeholderData,
  };
}

export function usePrefetchTreatments(): void {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(TREATMENTS_QUERY_KEY, getTreatments);
}
