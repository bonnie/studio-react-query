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
  //  userId is only present if the appointment is booked
  userId?: number;
}

export interface Treatment extends Id {
  name: string;
  durationInMinutes: number;
  imageUrl: string;
  description: string;
}
