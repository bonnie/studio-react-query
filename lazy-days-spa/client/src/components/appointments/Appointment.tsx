import React, { ReactElement } from 'react';

import { Appointment as AppointmentType } from '../../../../shared/types';
import { useAuth } from '../../hooks/useAuth';

interface AppointmentProps {
  appointmentData: AppointmentType;
}

export function Appointment({
  appointmentData,
}: AppointmentProps): ReactElement {
  const { user } = useAuth();
  return <div />;
}
