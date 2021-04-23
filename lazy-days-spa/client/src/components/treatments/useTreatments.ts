import { useQuery } from 'react-query';

import type { Treatment } from '../../../../shared/types';
import { axiosInstance } from '../../axiosInstance';
import { useQueryError } from '../app/useQueryError';

async function getTreatments() {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

interface UseTreatments {
  treatments: Treatment[];
}
export function useTreatments(): UseTreatments {
  const useErrorToast = useQueryError();

  const placeholderData: Treatment[] = [];
  const { data } = useQuery('treatments', getTreatments, {
    onError: useErrorToast,
  });
  return {
    treatments: data ?? placeholderData,
  };
}
