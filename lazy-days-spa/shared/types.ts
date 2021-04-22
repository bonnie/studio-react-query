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
  // this should be a treatmentId, which would be reasonable if this were
  // a real db. For ease, I'm going to "cheat" and just give the name as
  // a string here.
  treatmentName: string;
  //  userId is only present if the appointment is booked
  userId?: number;
}

export interface TreatmentImageCredit {
  authorName: string;
  authorLink: string;
  platformName: string;
  platformLink: string;
}

export interface Treatment extends Id {
  name: string;
  durationInMinutes: number;
  imageUrl: string;
  imageCredit: TreatmentImageCredit;
  description: string;
}
