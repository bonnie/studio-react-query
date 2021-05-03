import { Appointment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useUser } from '../../user/hooks/useUser';

// for when we need functions for useMutation
async function setAppointmentUser(
  appointment: Appointment,
  userId: number,
): Promise<Appointment[]> {
  const patchOp = appointment.userId ? 'replace' : 'add';
  const patchData = [{ op: patchOp, path: '/userId', value: userId }];
  const { data } = await axiosInstance.patch(
    `/appointments/${appointment.id}`,
    {
      data: patchData,
    },
  );
  return data;
}

async function deleteAppointment(appointmentId) {
  await axiosInstance.delete(`/appointments/${appointmentId}`);
}

interface UseUpdateAppointment {
  setAppointment: () => void;
  cancelAppointment: () => void;
}

export function useUpdateAppointment(): UseUpdateAppointment {
  const { user } = useUser();

  function setAppointment(): void {
    // if (!user?.id) return;
    // TODO: update with useMutation
  }
  function cancelAppointment(): void {
    // if (!user?.id) return;
    // TODO: update with useMutation
  }

  return {
    setAppointment,
    cancelAppointment,
  };
}
