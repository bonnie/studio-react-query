import moment from 'moment';

import type { Appointment } from '../../../../shared/types';
import type { AppointmentDateMap } from './types';

export function getAppointmentColor(
  appointmentData: Appointment,
  userId: number | undefined,
): [string, string] {
  const taken = !!appointmentData.userId;

  if (taken) {
    const textColor = 'black';
    const bgColor = appointmentData.userId === userId ? 'white' : 'gray.300';
    return [textColor, bgColor];
  }
  const textColor = 'white';

  switch (appointmentData.treatmentName) {
    case 'Massage':
      return [textColor, 'purple.700'];
    case 'Scrub':
      return [textColor, 'blue.700'];
    case 'Facial':
      return [textColor, 'green.700'];
    default:
      return [textColor, 'black'];
  }
}

// helper function for sorting appointments by hour
function sortByHour(a: Appointment, b: Appointment) {
  return (
    Number(moment(a.dateTime).format('h')) -
    Number(moment(b.dateTime).format('h'))
  );
}

// function to sort an array of appointments into an object
// with keys as the day of the month and values as arrays of
// appointments
export function transformAppointmentData(
  appointments: Appointment[],
): AppointmentDateMap {
  const dateMap: AppointmentDateMap = {};
  appointments.forEach((appointment) => {
    const appointmentDate = Number(moment(appointment.dateTime).format('DD'));
    if (dateMap[appointmentDate]) {
      // add this appointment to the array
      dateMap[appointmentDate].push(appointment);
      // sort by time
      dateMap[appointmentDate].sort(sortByHour);
    } else {
      // otherwise, just add the appointment to the key for this date
      dateMap[appointmentDate] = [appointment];
    }
  });
  return dateMap;
}
