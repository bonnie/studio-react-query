import { Appointment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';

// for when server call is needed
// async function removeAppointmentUser(appointment: Appointment): Promise<void> {
//   const patchData = [{ op: 'remove', path: '/userId' }];
//   await axiosInstance.patch(`/appointment/${appointment.id}`, {
//     data: patchData,
//   });
// }

// TODO: update return type
export function useCancelAppointment(): void {
  // TODO: create and return mutation
}
