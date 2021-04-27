import moment from 'moment';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

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

function getUpdatedMonthYear(monthYear: MonthYear, monthIncrement: number) {
  // the clone is necessary to prevent mutation
  return monthYear.startDate.clone().add(monthIncrement, 'months');
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
  updateMonthYear: (monthIncrement: number) => void;
}

export function useAppointments(): UseAppointments {
  // relocated from Calendar.tsx
  const currentDate = moment();
  const [monthYear, setMonthYear] = useState(getMonthYearDetails(currentDate));
  const queryClient = useQueryClient();

  useEffect(() => {
    // assume increment of one month
    const nextMonthYear = getMonthYearDetails(
      getUpdatedMonthYear(monthYear, 1),
    );
    queryClient.prefetchQuery(
      [APPOINTMENTS_KEY, nextMonthYear.year, nextMonthYear.month],
      () => getAppointments(nextMonthYear.year, nextMonthYear.month),
    );
  }, [queryClient, monthYear]);

  function updateMonthYear(monthIncrement: number): void {
    setMonthYear((prevData) =>
      getMonthYearDetails(getUpdatedMonthYear(prevData, monthIncrement)),
    );
  }

  const placeholderData: AppointmentDateMap = {};
  const { data = placeholderData } = useQuery(
    [APPOINTMENTS_KEY, monthYear.year, monthYear.month],
    () => getAppointments(monthYear.year, monthYear.month),
    { keepPreviousData: true },
  );

  return {
    appointments: data,
    monthYear,
    updateMonthYear,
  };
}
