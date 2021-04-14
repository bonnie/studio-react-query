import React, { ReactElement } from 'react';

import { Appointment as AppointmentType } from '../../../../shared/types';

interface AppointmentProps {
  appointmentData: AppointmentType;
}

export function Appointment({
  appointmentData,
}: AppointmentProps): ReactElement {
  return <div />;
}
