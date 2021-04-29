import {
  Box,
  Center,
  Heading,
  IconButton,
  Table,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import { useSetAppointment } from 'components/appointments/hooks/useSetAppointment';
import dayjs from 'dayjs';
import { ReactElement } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { Link, Redirect } from 'react-router-dom';

import type { Appointment } from '../../../../shared/types';
import { useUser } from './hooks/useUser';
import { useUserAppointments } from './hooks/useUserAppointments';

interface AppointmentsTableProps {
  userAppointments: Appointment[];
}

function AppointmentsTable({ userAppointments }): ReactElement {
  const { cancelAppointment } = useSetAppointment();

  return (
    <Table variant="simple" m={10} maxWidth="500px">
      {userAppointments.map((appointment) => (
        <Tr key={appointment.id}>
          <Td>
            <Text>{dayjs(appointment.dateTime).format('MMM D')}</Text>
          </Td>
          <Td>
            <Text>{dayjs(appointment.dateTime).format('h a')}</Text>
          </Td>
          <Td>
            <Text>{appointment.treatmentName}</Text>
          </Td>
          <Td>
            <IconButton
              aria-label="cancel appointment"
              onClick={() => cancelAppointment(appointment.id)}
              icon={<ImCancelCircle />}
            />
          </Td>
        </Tr>
      ))}
    </Table>
  );
}

export function UserAppointments(): ReactElement {
  const { user } = useUser();
  const userAppointments = useUserAppointments();

  if (!user) {
    return <Redirect to="/signin" />;
  }

  return (
    <Box>
      <Heading mt={10} align="center">
        Your Appointments
      </Heading>
      <Center>
        {userAppointments.length > 0 ? (
          <AppointmentsTable userAppointments={userAppointments} />
        ) : (
          <Link to="/Calendar">Book an appointment</Link>
        )}
      </Center>
    </Box>
  );
}
