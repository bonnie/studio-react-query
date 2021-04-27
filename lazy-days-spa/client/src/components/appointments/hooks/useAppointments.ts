import moment from 'moment';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { AppointmentDateMap } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { APPOINTMENTS_KEY } from './constants';

interface MonthYear {
  startDate: moment.Moment; // first day of the month
  firstDOW: number; // day of week; 0 === Sunday
  lastDate: number; // last date of the month
  monthName: string; // name of the month
  month: string; // two digit month number
  year: string; // four digit year
}

// get calendar-relevant data for the month containing initialDate
export function getMonthYearDetails(initialDate: moment.Moment): MonthYear {
  const month = initialDate.format('MM');
  const year = initialDate.format('YYYY');
  const startDate = moment(`${year}${month}01`);
  const firstDOW = Number(startDate.format('d'));
  const lastDate = Number(startDate.clone().endOf('month').format('DD'));
  const monthName = startDate.format('MMMM');
  return { startDate, firstDOW, lastDate, monthName, month, year };
}

async function getAppointments(
  year: string,
  month: string,
): Promise<AppointmentDateMap> {
  const { data } = await axiosInstance.get(`/appointments/${year}/${month}`);
  return data.appointments;
}

interface UseAppointments {
  appointments: AppointmentDateMap;
  monthYear: MonthYear;
  updateMonthYear: (increment: number) => void;
}

export function useAppointments(): UseAppointments {
  // relocated from Calendar.tsx
  const currentDate = moment();
  const [monthYear, setMonthYear] = useState(getMonthYearDetails(currentDate));

  function updateMonthYear(increment: number): void {
    setMonthYear((prevData) =>
      // the clone is necessary to prevent mutation
      getMonthYearDetails(prevData.startDate.clone().add(increment, 'months')),
    );
  }

  const placeholderData: AppointmentDateMap = {};
  const { data = placeholderData } = useQuery(
    [APPOINTMENTS_KEY, monthYear.year, monthYear.month],
    () => getAppointments(monthYear.year, monthYear.month),
  );

  return {
    appointments: data,
    monthYear,
    updateMonthYear,
  };
}
