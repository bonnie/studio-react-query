import { Appointment } from '../../../../shared/types';

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

  switch (appointmentData.treatmentId) {
    case 1:
      return [textColor, 'red.700'];
    case 2:
      return [textColor, 'blue.700'];
    case 3:
      return [textColor, 'green.700'];
    default:
      return [textColor, 'black'];
  }
}
