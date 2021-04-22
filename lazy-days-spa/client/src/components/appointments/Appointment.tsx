import { Box, HStack, Text } from '@chakra-ui/react';
import moment from 'moment';
import React, { ReactElement } from 'react';

import { Appointment as AppointmentType } from '../../../../shared/types';
import { useAuth } from '../../auth/useAuth';
import { useAppointments } from './useAppointments';
import { getAppointmentColor } from './utils';

interface AppointmentProps {
  appointmentData: AppointmentType;
}

export function Appointment({
  appointmentData,
}: AppointmentProps): ReactElement {
  const { user } = useAuth();
  const { setAppointment } = useAppointments();
  const [textColor, bgColor] = getAppointmentColor(appointmentData, user?.id);

  // can this appointment be reserved or un-reserved by this user?
  const clickable =
    user?.id &&
    (!appointmentData.userId || appointmentData.userId === user?.id);
  const reserveAppointment = () => setAppointment(appointmentData.id);

  const time = moment(appointmentData.dateTime).format('h a');
  return (
    <Box
      borderRadius="lg"
      px={2}
      bgColor={bgColor}
      color={textColor}
      as={clickable ? 'button' : 'div'}
      onClick={clickable ? reserveAppointment : undefined}
    >
      <HStack justify="space-between">
        <Text as="span" fontSize="xs">
          {time}
        </Text>
        <Text as="span" fontSize="xs">
          {appointmentData.treatmentName}
        </Text>
      </HStack>
    </Box>
  );
}
