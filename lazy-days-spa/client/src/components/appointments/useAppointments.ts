import { useToast } from '@chakra-ui/react';
import moment from 'moment';

import { useAuth } from '../../auth/useAuth';
import { AppointmentDateMap } from './types';
import { transformAppointmentData } from './utils';

const fakeAppointments = [
  {
    id: 10,
    treatmentName: 'Massage',
    userId: 1,
    dateTime: moment().toDate(),
  },
  {
    id: 11,
    treatmentName: 'Massage',
    dateTime: moment().add(-1, 'hours').toDate(),
  },
  {
    id: 12,
    treatmentName: 'Scrub',
    dateTime: moment().add(2, 'hours').subtract(4, 'days').toDate(),
  },
  {
    id: 13,
    treatmentName: 'Facial',
    dateTime: moment().add(3, 'days').toDate(),
  },
];

interface UseAppointments {
  appointments: AppointmentDateMap;
  setAppointment: (appointmentId: number) => void;
}

export function useAppointments(): UseAppointments {
  const { user } = useAuth();
  const toast = useToast();

  // TODO: update with useQuery!
  const appointments = transformAppointmentData(fakeAppointments);

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
