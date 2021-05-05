import { Appointment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { mockAppointments } from '../../../mocks/mockData';
import { queryKeys } from '../../../react-query/constants';
import { AppointmentDateMap } from '../types';

// for when we need a query function for useQuery
// async function getAppointments(year: string, month: string): Promise<Appointment[]> {
//   const { data } = await axiosInstance.get(`/appointments/${year}/${month}`);
//   return data;
// }

export function useAppointments(): AppointmentDateMap {
  // TODO: update with useQuery!

  return mockAppointments;
}
