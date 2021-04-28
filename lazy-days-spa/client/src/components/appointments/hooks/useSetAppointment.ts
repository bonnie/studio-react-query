import { Appointment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useCustomToast } from '../../app/hooks/useCustomToast';
import { useUser } from '../../user/hooks/useUser';

// for when we need a query function for useQuery
// async function setAppointmentUser(
//   appointmentId: number,
//   previousUserId: number | undefined,
//   userId: number,
// ): Promise<Appointment[]> {
//   const patchOp = previousUserId ? 'replace' : 'add';
//   const patchData = [{ op: patchOp, path: '/userId', value: userId }];
//   const { data } = await axiosInstance.patch(`/appointments/${appointmentId}`, {
//     data: patchData,
//   });
//   return data;
// }

export function useSetAppointment(
  appointmentId: number,
): (appointmentId: number) => void {
  const { user } = useUser();
  const toast = useCustomToast();

  function setAppointment(): void {
    const userId = user?.id;
    if (!userId) {
      // if the user isn't logged in, show a warning
      toast({
        title: 'you must be logged in to reserve an appointment',
        status: 'warning',
      });
    } else {
      // TODO: update with useMutation
      // reserve appointment if it's open, or un-reserve if the appointment
      // belongs to the user
    }
  }
  return setAppointment;
}
