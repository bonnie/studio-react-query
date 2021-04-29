import dayjs from 'dayjs';

import { Appointment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { AppointmentDateMap } from '../types';

const fakeAppointments = {
  1: [
    {
      id: 10,
      treatmentName: 'Massage',
      userId: 1,
      dateTime: dayjs().toDate(),
    },
    {
      id: 11,
      treatmentName: 'Massage',
      dateTime: dayjs().add(-1, 'hours').toDate(),
    },
  ],
  12: [
    {
      id: 12,
      treatmentName: 'Scrub',
      dateTime: dayjs().add(2, 'hours').subtract(4, 'days').toDate(),
    },
    {
      id: 13,
      treatmentName: 'Facial',
      dateTime: dayjs().add(3, 'days').toDate(),
    },
  ],
};

// for when we need a query function for useQuery
// async function getAppointments(year: string, month: string): Promise<Appointment[]> {
//   const { data } = await axiosInstance.get(`/appointments/${year}/${month}`);
//   return data;
// }

export function useAppointments(): AppointmentDateMap {
  // TODO: update with useQuery!
  const appointments = fakeAppointments;

  return appointments;
}
