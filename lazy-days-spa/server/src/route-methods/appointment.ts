/* eslint-disable import/no-unresolved */
import { Appointment, NewAppointment } from '../../../shared/types';
import db from '../db-func/index.js';

export async function addNewAppointment(
  newAppointmentData: NewAppointment,
): Promise<Appointment> {
  const newAppointment = await db.addNewItem(
    db.filenames.appointments,
    newAppointmentData,
  );
  return newAppointment;
}

export async function deleteAppointment(
  appointmentId: number,
): Promise<number> {
  return db.deleteItem(db.filenames.appointments, appointmentId);
}

export async function updateAppointment(
  appointmentData: Appointment,
): Promise<Appointment> {
  return db.updateItem(db.filenames.appointments, appointmentData);
}
