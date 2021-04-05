interface Id { id: number }

export interface NewUser {
  // leaving room for address, phone number, etc to be added here
  email: string;
  token?: string;
}

export type User = Id & NewUser & { appointments?: Appointment[]};

export interface NewAppointment {
  dateTime: Date;
  userId?: number;
  treatmentId: number;
  staffName: string;
}

export type Appointment = Id & NewAppointment;

export interface Treatment {
  id: number;
  name: string;
  durationInMinutes: number;
  imageUrl: string;
  description: string;
}
