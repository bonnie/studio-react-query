/* eslint-disable max-lines-per-function */
import { Box, Grid, Heading, HStack, IconButton } from '@chakra-ui/react';
import moment from 'moment';
import React, { ReactElement, useState } from 'react';
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti';

import { DateBox } from './DateBox';
import { useAppointments } from './useAppointments';

interface MonthData {
  startDate: moment.Moment; // first day of the month
  firstDOW: number; // day of week; 0 === Sunday
  lastDate: number; // last date of the month
  monthName: string; // name of the month
  month: string; // two digit month number
  year: string; // four digit year
}

// get calendar-relevant data for the month containing initialDate
function getMonthData(initialDate: moment.Moment): MonthData {
  const month = initialDate.format('MM');
  const year = initialDate.format('YYYY');
  const startDate = moment(`${year}${month}01`);
  const firstDOW = Number(startDate.format('d'));
  const lastDate = Number(startDate.endOf('month').format('DD'));
  const monthName = startDate.format('MMMM');
  return { startDate, firstDOW, lastDate, monthName, month, year };
}

export function Calendar(): ReactElement {
  const [monthData, setMonthData] = useState(getMonthData(moment()));

  // TODO: replace with hook
  const { appointments } = useAppointments();

  function updateMonth(increment: number): void {
    setMonthData((prevData) =>
      // the clone is necessary to prevent mutation
      getMonthData(prevData.startDate.clone().add(increment, 'months')),
    );
  }
  return (
    <Box>
      <HStack m={5} spacing={8} justify="center">
        <IconButton
          aria-label="previous month"
          onClick={() => updateMonth(-1)}
          icon={<TiArrowLeftThick />}
        />
        <Heading size="2xl" minW="40%" textAlign="center">
          {monthData.monthName} {monthData.year}
        </Heading>
        <IconButton
          aria-label="next month"
          onClick={() => updateMonth(1)}
          icon={<TiArrowRightThick />}
        />
      </HStack>
      <Grid templateColumns="repeat(7, 1fr)" gap={4} m={10}>
        {/* first day needs a grid column */}
        <DateBox
          date={1}
          gridColumn={monthData.firstDOW}
          appointments={appointments[1]}
        />
        {/* the rest of the days will follow */}
        {[...Array(monthData.lastDate)].map((_, i) =>
          i > 0 ? (
            <DateBox key={i} date={i + 1} appointments={appointments[i + 1]} />
          ) : null,
        )}
      </Grid>
    </Box>
  );
}
