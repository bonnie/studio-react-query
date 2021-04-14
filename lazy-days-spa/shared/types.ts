export interface Id {
  id: number;
}

export interface NewUser {
  email: string;
  address?: string;
  phoneNum?: string;
  token?: string;
}

export type User = Id & NewUser;

export interface Appointment extends Id {
  dateTime: Date;
  treatmentId: number;
}

export interface BookedAppointment extends Appointment {
  userId: number;
  // staff should have its own model, but it's not necessary for this course
  staffName: string;
}

export interface TreatmentLight extends Id {
  name: string;
  durationInMinutes: number;
}

export interface TreatmentFull extends TreatmentLight {
  imageUrl: string;
  description: string;
  // staff should have its own model, but it's not necessary for this course
  staff: string[];
}
