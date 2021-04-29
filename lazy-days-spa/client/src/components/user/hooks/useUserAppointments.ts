import dayjs from 'dayjs';

import type { Appointment } from '../../../../../shared/types';
import { useAuth } from '../../../auth/useAuth';
import { queryKeys } from '../../../react-query/constants';

// for when we need a query function for useQuery
// function getUserAppointments(userId: number | null): Promise<Appointment[]> {
//   if (userId) {
//    return axiosInstance.get(`/user/${userId}/appointments`);
//   } else {
//      return Promise.resolve(null);
//   }
// }

const fakeUserAppointments = [
  {
    id: 10,
    treatmentName: 'Massage',
    userId: 1,
    dateTime: dayjs().toDate(),
  },
  {
    id: 13,
    treatmentName: 'Facial',
    dateTime: dayjs().add(3, 'days').toDate(),
  },
];

export function useUserAppointments(): Appointment[] {
  // TODO replace with React Query
  return fakeUserAppointments;
}
