import dayjs from 'dayjs';

import type { Appointment, User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useUser } from './useUser';

// for when we need a query function for useQuery
// async function getUserAppointments(
//   user: User | null,
// ): Promise<Appointment[] | null> {
//   if (!user) return null;
//   const { data } = await axiosInstance.get(`/user/${user.id}/appointments`, {
//     headers: getJWTHeader(user),
//   });
//   return data.appointments;
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
