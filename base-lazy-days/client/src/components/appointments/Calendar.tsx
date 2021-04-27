/* eslint-disable max-lines-per-function */
import {
  Box,
  Checkbox,
  Grid,
  Heading,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import moment from 'moment';
import { ReactElement, useState } from 'react';
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti';

import { DateBox } from './DateBox';
import { useAppointments } from './hooks/useAppointments';

interface MonthYear {
  startDate: moment.Moment; // first day of the month
  firstDOW: number; // day of week; 0 === Sunday
  lastDate: number; // last date of the month
  monthName: string; // name of the month
  month: string; // two digit month number
  year: string; // four digit year
}

// get calendar-relevant data for the month containing initialDate
function getMonthYearDetails(initialDate: moment.Moment): MonthYear {
  const month = initialDate.format('MM');
  const year = initialDate.format('YYYY');
  const startDate = moment(`${year}${month}01`);
  const firstDOW = Number(startDate.format('d'));
  const lastDate = Number(startDate.clone().endOf('month').format('DD'));
  const monthName = startDate.format('MMMM');
  return { startDate, firstDOW, lastDate, monthName, month, year };
}

export function Calendar(): ReactElement {
  const currentDate = moment();
  const [monthYear, setMonthYear] = useState(getMonthYearDetails(currentDate));

  // show all appointments, or just the available ones?
  // TODO: implement with React Query
  const [showAll, setShowAll] = useState(false);

  // TODO: make dependent on monthYear.month and monthYear.year
  const appointments = useAppointments();

  function updateMonthYear(monthIncrement: number): void {
    setMonthYear((prevData) =>
      // the clone is necessary to prevent mutation
      getMonthYearDetails(
        prevData.startDate.clone().add(monthIncrement, 'months'),
      ),
    );
  }
  return (
    <Box>
      <HStack mt={10} spacing={8} justify="center">
        <IconButton
          aria-label="previous month"
          onClick={() => updateMonthYear(-1)}
          icon={<TiArrowLeftThick />}
          isDisabled={monthYear.startDate < currentDate}
        />
        <Heading minW="40%" textAlign="center">
          {monthYear.monthName} {monthYear.year}
        </Heading>
        <IconButton
          aria-label="next month"
          onClick={() => updateMonthYear(1)}
          icon={<TiArrowRightThick />}
        />
        <Checkbox
          variant="flushed"
          width="48"
          position="absolute"
          right="10px"
          checked={!showAll}
          onChange={() => setShowAll((prevValue) => !prevValue)}
        >
          Only show available
        </Checkbox>
      </HStack>
      <Grid templateColumns="repeat(7, 1fr)" gap={4} my={5} mx={10}>
        {/* first day needs a grid column */}
        <DateBox
          date={1}
          gridColumn={monthYear.firstDOW + 1}
          appointments={appointments[1]}
        />
        {/* the rest of the days will follow */}
        {[...Array(monthYear.lastDate)].map((_, i) =>
          i > 0 ? (
            <DateBox key={i} date={i + 1} appointments={appointments[i + 1]} />
          ) : null,
        )}
      </Grid>
    </Box>
  );
}
