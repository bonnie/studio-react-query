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
import { Redirect } from 'react-router-dom';

import { useAuth } from '../../auth/useAuth';
import { useUserAppointments } from './hooks/useUserAppointments';

export function UserAppointments(): ReactElement {
  const { user } = useAuth();
  const userAppointments = useUserAppointments();
  const { cancelAppointment } = useSetAppointment();

  if (!user) {
    return <Redirect to="/signin" />;
  }

  return (
    <Box>
      <Heading mt={10} align="center">
        Your Appointments
      </Heading>
      <Center>
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
      </Center>
    </Box>
  );
}
