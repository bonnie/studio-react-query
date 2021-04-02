interface Id { id: number }

export interface NewUser {
    email: string;
    token?: string;
  }

export type User = Id & NewUser;

export interface NewAppointment {
    date: Date;
    userId: number;
    treatmentId: number;
}

export type Appointment = Id & NewAppointment;

export interface Treatment {
    id: number;
    name: string;
    durationInMinutes: number;
    imageUrl: string;
    description: string;
}