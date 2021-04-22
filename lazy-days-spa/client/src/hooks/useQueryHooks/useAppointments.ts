import { useToast } from '@chakra-ui/react';
import moment from 'moment';

import { Appointment } from '../../../../shared/types';
import { useAuth } from '../useAuth';

interface UseAppointments {
  appointments: Record<number, Appointment[]>;
  setAppointment: (appointmentId: number) => void;
}

export function useAppointments(): UseAppointments {
  const { user } = useAuth();
  const toast = useToast();

  // TODO: update with useQuery!
  const appointments = {
    1: [
      {
        id: 10,
        treatmentName: 'massage',
        userId: 1,
        dateTime: moment().toDate(),
      },
    ],
    6: [
      {
        id: 12,
        treatmentName: 'scrub',
        dateTime: moment().add(2, 'hours').toDate(),
      },
    ],
  };
  function setAppointment(appointmentId: number): void {
    const userId = user?.id;
    if (!userId) {
      // if the user isn't logged in, show an error
      toast({
        title: 'you must be logged in to reserve an appointment',
        variant: 'subtle',
        status: 'warning',
        isClosable: true,
      });
    } else {
      // TODO: update with useQuery
      // reserve appointment if it's open, or un-reserve if the appointment
      // belongs to the user
    }
  }
  return {
    appointments,
    setAppointment,
  };
}
