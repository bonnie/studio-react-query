import { useQuery } from 'react-query';

import { AppointmentDateMap } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';

const APPOINTMENTS_KEY = 'appointments';

async function getAppointments(
  year: string,
  month: string,
): Promise<AppointmentDateMap> {
  const { data } = await axiosInstance.get(`/appointments/${year}/${month}`);
  return data;
}

export function useAppointments(
  year: string,
  month: string,
): AppointmentDateMap {
  const placeholderData: AppointmentDateMap = {};
  const { data } = useQuery(APPOINTMENTS_KEY, () =>
    getAppointments(year, month),
  );

  return data ?? placeholderData;
}
