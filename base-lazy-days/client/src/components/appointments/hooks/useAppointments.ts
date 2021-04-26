import moment from 'moment';

import { Appointment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { AppointmentDateMap } from '../types';
import { transformAppointmentData } from '../utils';
import { APPOINTMENTS_KEY } from './constants';

const fakeAppointments = [
  {
    id: 10,
    treatmentName: 'Massage',
    userId: 1,
    dateTime: moment().toDate(),
  },
  {
    id: 11,
    treatmentName: 'Massage',
    dateTime: moment().add(-1, 'hours').toDate(),
  },
  {
    id: 12,
    treatmentName: 'Scrub',
    dateTime: moment().add(2, 'hours').subtract(4, 'days').toDate(),
  },
  {
    id: 13,
    treatmentName: 'Facial',
    dateTime: moment().add(3, 'days').toDate(),
  },
];

// for when we need a query function for useQuery
// async function getAppointments(year: string, month: string): Promise<Appointment[]> {
//   const { data } = await axiosInstance.get(`/appointments/${year}/${month}`);
//   return data;
// }

export function useAppointments(): AppointmentDateMap {
  // TODO: update with useQuery!
  const appointments = transformAppointmentData(fakeAppointments);

  return appointments;
}
