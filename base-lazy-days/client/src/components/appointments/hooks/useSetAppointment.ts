import { Appointment } from '../../../../../shared/types';
import { useAuth } from '../../../auth/useAuth';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useCustomToast } from '../../app/hooks/useCustomToast';

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

interface UseSetAppointment {
  setAppointment: (appointmentId: number) => void;
  cancelAppointment: (appointmentId: number) => void;
}

export function useSetAppointment(): UseSetAppointment {
  const { user } = useAuth();
  const toast = useCustomToast();
  const userId = user?.id;

  function warnNotLoggedIn() {
    toast({
      title: 'you must be logged in to reserve an appointment',
      status: 'warning',
    });
  }

  function setAppointment(appointmentId: number): void {
    if (!userId) {
      warnNotLoggedIn();
    } else {
      // TODO: update with useMutation
    }
  }
  function cancelAppointment(appointmentId: number): void {
    if (!userId) {
      warnNotLoggedIn();
    } else {
      // TODO: update with useMutation
    }
  }

  return {
    setAppointment,
    cancelAppointment,
  };
}
