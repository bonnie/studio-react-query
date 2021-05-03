/* eslint-disable no-plusplus */
/* eslint-disable max-lines-per-function */
import dayjs from 'dayjs';

import { Appointment, AppointmentDateMap } from '../../../shared/types';

// utility function to make unpadded month/date numbers into padded
function padNum(num: number | string): string {
  return num.toString().length === 1 ? `0${num}` : num.toString();
}

// utility function to make appointment from date and treatment type
function makeAppointment(
  treatmentName: string,
  dateTime: dayjs.Dayjs,
  filledAppointmentsById: Record<number, Appointment>,
): Appointment {
  const id = Number(dayjs(dateTime).unix());

  // if the appointment is filled, don't make the recurring appointment
  if (filledAppointmentsById[id]) return filledAppointmentsById[id];

  // otherwise, make the recurring appointment
  const appointment: Appointment = {
    id,
    dateTime: dateTime.toDate(),
    treatmentName,
  };

  // assign some appointments as filled based on datetime mod
  if (dateTime.unix() % 4500 === 0) appointment.userId = 200;

  return appointment;
}

// generate an appointments object with recurring appointments
export function createAppointments(
  year: string,
  month: string,
  filledAppointments: Appointment[],
): AppointmentDateMap {
  // make sure month is two digits
  const monthString = padNum(month);

  const startDate = dayjs(`${year}${monthString}01`);
  const lastDate = Number(startDate.endOf('month').format('DD'));

  // make a map of appointments by id for easy access;
  const filledAppointmentsById = {};
  filledAppointments.forEach((a) => {
    filledAppointmentsById[a.id] = a;
  });

  const appointments: AppointmentDateMap = {};
  for (let i = 0; i < lastDate; i++) {
    const dayNum = i + 1;
    const thisDate = dayjs(`${year}${monthString}${padNum(dayNum)}`);
    const dayofWeek = Number(thisDate.format('d'));
    switch (dayofWeek) {
      case 1:
        // Mondays: massage 10am, facial 2pm
        appointments[dayNum] = [
          makeAppointment(
            'massage',
            thisDate.clone().add(10, 'hours'),
            filledAppointmentsById,
          ),
          makeAppointment(
            'facial',
            thisDate.clone().add(14, 'hours'),
            filledAppointmentsById,
          ),
        ];
        break;
      case 2:
        // Tuesdays: scrub 1pm, massage 3pm
        appointments[dayNum] = [
          makeAppointment(
            'scrub',
            thisDate.clone().add(13, 'hours'),
            filledAppointmentsById,
          ),
          makeAppointment(
            'massage',
            thisDate.clone().add(15, 'hours'),
            filledAppointmentsById,
          ),
        ];
        break;
      case 3:
        // Wednesdays: facial: 11am, scrub 4pm
        appointments[dayNum] = [
          makeAppointment(
            'facial',
            thisDate.clone().add(11, 'hours'),
            filledAppointmentsById,
          ),
          makeAppointment(
            'scrub',
            thisDate.clone().add(16, 'hours'),
            filledAppointmentsById,
          ),
        ];
        break;
      case 4:
        // Thursdays: scrub: 9am, scrub 1pm
        appointments[dayNum] = [
          makeAppointment(
            'scrub',
            thisDate.clone().add(9, 'hours'),
            filledAppointmentsById,
          ),
          makeAppointment(
            'scrub',
            thisDate.clone().add(13, 'hours'),
            filledAppointmentsById,
          ),
        ];
        break;
      case 5:
        // Fridays: massage: 1pm, massage 3pm
        appointments[dayNum] = [
          makeAppointment(
            'massage',
            thisDate.clone().add(13, 'hours'),
            filledAppointmentsById,
          ),
          makeAppointment(
            'massage',
            thisDate.clone().add(15, 'hours'),
            filledAppointmentsById,
          ),
        ];
        break;
      default:
        // by default, no appointments
        appointments[dayNum] = [];
        break;
    }
  }

  return appointments;
}
