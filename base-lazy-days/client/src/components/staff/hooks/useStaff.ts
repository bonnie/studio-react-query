import type { Staff } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { mockStaff } from '../../../mocks/mockData';
import { queryKeys } from '../../../react-query/constants';
import { filterByTreatment } from '../utils';

// for when we need a query function for useQuery
// async function getStaff(): Promise<Staff[]> {
//   const { data } = await axiosInstance.get('/staff');
//   return data;
// }

export function useStaff(): Staff[] {
  // TODO: get data from server via useQuery
  return mockStaff;
}
