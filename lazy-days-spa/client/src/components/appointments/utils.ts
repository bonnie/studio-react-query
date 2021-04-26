import type { Appointment } from '../../../../shared/types';

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
