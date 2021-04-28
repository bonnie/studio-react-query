import { useQuery, useQueryClient } from 'react-query';

import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';

async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

interface UseTreatments {
  treatments: Treatment[];
}
export function useTreatments(): UseTreatments {
  const placeholderData: Treatment[] = [];
  const { data } = useQuery(queryKeys.treatments, getTreatments);
  return {
    treatments: data ?? placeholderData,
  };
}

export function usePrefetchTreatments(): void {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.treatments, getTreatments);
}
