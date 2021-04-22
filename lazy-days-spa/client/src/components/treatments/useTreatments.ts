import { useToast } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import type { Treatment } from '../../../../shared/types';
import { axiosInstance } from '../../axiosInstance';
import { toastOptions } from '../../constants';

async function getTreatments() {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

interface UseTreatments {
  treatments: Treatment[];
}
export function useTreatments(): UseTreatments {
  const toast = useToast(toastOptions);

  const placeholderData: Treatment[] = [];
  const { data } = useQuery('treatments', getTreatments, {
    onError: (error) =>
      toast({ title: 'error contacting the server', status: 'error' }),
  });
  return {
    treatments: data ?? placeholderData,
  };
}
