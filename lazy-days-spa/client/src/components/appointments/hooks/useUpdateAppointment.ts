import { useMutation, UseMutationResult } from 'react-query';

import { Appointment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useUser } from '../../user/hooks/useUser';

// for when we need functions for useMutation
async function setAppointmentUser(
  appointment: Appointment,
  userId: number | undefined,
): Promise<void> {
  if (!userId) return;
  const patchOp = appointment.userId ? 'replace' : 'add';
  const patchData = [{ op: patchOp, path: '/userId', value: userId }];
  await axiosInstance.patch(`/appointment/${appointment.id}`, {
    data: patchData,
  });
}

async function deleteAppointment(appointmentId) {
  await axiosInstance.delete(`/appointments/${appointmentId}`);
}

export function useUpdateAppointment(): UseMutationResult<
  void,
  unknown,
  Appointment,
  unknown
> {
  const { user } = useUser();

  return useMutation((appointment: Appointment) =>
    setAppointmentUser(appointment, user?.id),
  );
}
