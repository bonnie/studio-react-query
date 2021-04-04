import { Appointment, NewAppointment } from '../../../shared/types';
import db, { Error } from '.';

export async function addNewAppointment(
  newAppointmentData: NewAppointment,
): Promise<Appointment | Error> {
  try {
    const newAppointment = await db.addNewItem(
      db.filenames.appointments,
      newAppointmentData,
    );
    return newAppointment;
  } catch (e) {
    return { error: `could not add new appointment: ${e}` };
  }
}

export async function deleteAppointment(
  appointmentId: number,
): Promise<number | Error> {
  try {
    return db.deleteItem(db.filenames.appointments, appointmentId);
  } catch (e) {
    return { error: `could not delete appointment: ${e}` };
  }
}

export async function updateAppointment(
  appointmentData: Appointment,
): Promise<Appointment | Error> {
  try {
    return db.updateItem(db.filenames.appointments, appointmentData);
  } catch (e) {
    return { error: `could not update appointment: ${e}` };
  }
}
