import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import {
  QueryFunction,
  QueryKey,
  QueryObserverOptions,
  useQuery,
  useQueryClient,
} from 'react-query';

import { AppointmentDateMap } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useUser } from '../../user/hooks/useUser';
import { getAvailableAppointments } from '../utils';

interface MonthYear {
  startDate: dayjs.Dayjs; // first day of the month
  firstDOW: number; // day of week; 0 === Sunday
  lastDate: number; // last date of the month
  monthName: string; // name of the month
  month: string; // two digit month number
  year: string; // four digit year
}

// get calendar-relevant data for the month containing initialDate
export function getMonthYearDetails(initialDate: dayjs.Dayjs): MonthYear {
  const month = initialDate.format('MM');
  const year = initialDate.format('YYYY');
  const startDate = dayjs(`${year}${month}01`);
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
  showAll: boolean;
  setShowAll: Dispatch<SetStateAction<boolean>>;
}

export function useAppointments(): UseAppointments {
  // relocated from Calendar.tsx
  const currentDate = dayjs();
  const [monthYear, setMonthYear] = useState(getMonthYearDetails(currentDate));
  const queryClient = useQueryClient();

  // for showing all appointments or just available ones
  const [showAll, setShowAll] = useState(false);
  const { user } = useUser();

  // stable function for select
  const selectFn = useCallback(
    (data: AppointmentDateMap) => getAvailableAppointments(data, user),
    [user],
  );

  const createQueryParams = (
    queryMonthYear: MonthYear,
    prefetch = true,
  ): [
    QueryKey,
    QueryFunction<AppointmentDateMap>,
    QueryObserverOptions<AppointmentDateMap>,
  ] => {
    function prefetchNextAndPreviousMonth() {
      const nextMonthYear = getMonthYearDetails(
        getUpdatedMonthYear(monthYear, 1),
      );
      queryClient.prefetchQuery<AppointmentDateMap>(
        ...createQueryParams(nextMonthYear, false),
      );

      const previousMonth = getMonthYearDetails(
        getUpdatedMonthYear(monthYear, -1),
      );
      queryClient.prefetchQuery<AppointmentDateMap>(
        ...createQueryParams(previousMonth, false),
      );
    }

    return [
      [queryKeys.appointments, queryMonthYear.year, queryMonthYear.month],
      () => getAppointments(queryMonthYear.year, queryMonthYear.month),
      {
        keepPreviousData: true,
        onSuccess: prefetch ? prefetchNextAndPreviousMonth : undefined,
        select: showAll ? undefined : selectFn,
      },
    ];
  };

  function updateMonthYear(monthIncrement: number): void {
    setMonthYear((prevData) =>
      getMonthYearDetails(getUpdatedMonthYear(prevData, monthIncrement)),
    );
  }

  const placeholderData: AppointmentDateMap = {};
  const { data: appointments = placeholderData } = useQuery<AppointmentDateMap>(
    ...createQueryParams(monthYear),
  );

  return {
    appointments,
    monthYear,
    updateMonthYear,
    showAll,
    setShowAll,
  };
}
