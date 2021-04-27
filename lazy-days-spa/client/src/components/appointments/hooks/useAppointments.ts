import { useState } from 'react';
import { useQuery } from 'react-query';

import { AppointmentDateMap } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';

const APPOINTMENTS_KEY = 'appointments';

async function getAppointments(
  year: string,
  month: string,
): Promise<AppointmentDateMap> {
  const { data } = await axiosInstance.get(`/appointments/${year}/${month}`);
  return data.appointments;
}

interface UseAppointments {
  appointments: AppointmentDateMap;
  setDate: (year: string, month: string) => void;
}

export function useAppointments(year: string, month: string): UseAppointments {
  const [currentDate, setCurrentDate] = useState({ year, month });

  const placeholderData: AppointmentDateMap = {};
  const { data } = useQuery(APPOINTMENTS_KEY, () =>
    getAppointments(currentDate.year, currentDate.month),
  );

  function setDate(newYear: string, newMonth: string) {
    setCurrentDate({ year: newYear, month: newMonth });
  }

  return {
    appointments: data ?? placeholderData,
    setDate,
  };
}
