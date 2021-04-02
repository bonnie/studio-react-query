// NOTE: in production this would connect to a database,
// not JSON files. However, I didn't want to make you install
// a particular database in order to use this app.
//
// This "database" is horribly inefficient and will be a problem
// when Lazy Days Spa opens to hundreds of locations globally.
import { promises as fs } from 'fs';
import path from 'path';

import {
  Appointment,
  NewAppointment,
  NewUser,
  Treatment,
  User,
} from '../../shared/types';

const dbPath = '../db';
enum filenames {
  users = 'users.json',
  appointments = 'appointments.json',
  treatments = 'treatments.json',
}

interface Error {
  error: string;
  status?: number;
}

/* ****** Read from file ***** */
async function getJSONfromFile(filename: filenames.users): Promise<User[]>;
async function getJSONfromFile(
  filename: filenames.appointments,
): Promise<Appointment[]>;
async function getJSONfromFile(
  filename: filenames.treatments,
): Promise<Treatment[]>;
async function getJSONfromFile(filename) {
  const filePath = path.join(dbPath, filename);
  const data = await fs.readFile(filePath);
  return JSON.parse(data.toString());
}

/* ****** Write to file ***** */
async function writeJSONToFile(
  filename: filenames.users,
  data: User[],
): Promise<void>;
async function writeJSONToFile(
  filename: filenames.appointments,
  data: Appointment[],
): Promise<void>;
async function writeJSONToFile(filename, data) {
  const filePath = path.join(dbPath, filename);
  const jsonData = JSON.stringify(data);
  await fs.writeFile(filePath, jsonData, { mode: 'w' });
}

/* ****** Add new item ***** */
async function addNewItem(
  filename: filenames.users,
  newItemData: NewUser,
): Promise<User>;
async function addNewItem(
  filename: filenames.appointments,
  newItemData: NewAppointment,
): Promise<Appointment>;
async function addNewItem(filename, newItemData) {
  const items = await getJSONfromFile(filename);

  // all keys are strings in JS; must map to number for TS
  const ids: number[] = Object.keys(items).map(Number);
  const maxId = ids.reduce((tempMaxId: number, itemId: number) => {
    return itemId > tempMaxId ? itemId : tempMaxId;
  }, 0);
  const newItemId = maxId + 1;
  const newItem = { ...newItemData, id: newItemId };
  await writeJSONToFile(filename, [...items, newItem]);
  return newItem;
}

/* ****** Delete item ***** */
async function deleteItem(
  filename: filenames.users,
  itemId: number,
): Promise<number | Error>;
async function deleteItem(
  filename: filenames.appointments,
  itemId: number,
): Promise<number | Error>;
async function deleteItem(filename, itemId) {
  try {
    const items = await getJSONfromFile(filename);
    const foundItemArray = items.filter((i) => i.id === itemId);
    if (foundItemArray.length !== 1) {
      return {
        error: `Could not find item id ${itemId} in ${filename}`,
        status: 400,
      };
    }
    const updatedItems = items.filter((i) => i.id !== itemId);
    await writeJSONToFile(filename, updatedItems);
    return itemId;
  } catch (e) {
    return {
      error: `Could not delete item id ${itemId} from ${filename}: ${e}`,
    };
  }
}

/* ****** Update item ***** */
async function updateItem(
  filename: filenames.users,
  updatedItemData: User,
): Promise<User | Error>;
async function updateItem(
  filename: filenames.appointments,
  updatedItemData: Appointment,
): Promise<Appointment | Error>;
async function updateItem(filename, updatedItemData) {
  try {
    const items = await getJSONfromFile(filename);
    let found = false;
    items.forEach((item, i) => {
      if (item.id === updatedItemData.id) {
        items[i] = updatedItemData;
        found = true;
      }
    });
    if (found === false) {
      return {
        error: `Could not find item id ${updatedItemData.id} in ${filename}`,
        status: 400,
      };
    }
    await writeJSONToFile(filename, items);
    return updatedItemData;
  } catch (e) {
    return {
      error: `Could not delete item id ${updatedItemData.id} from ${filename}: ${e}`,
    };
  }
}

/* ********** Users **************** */
interface UserData {
  userData: User;
  appointments: Appointment[];
}
export async function getUserData(userId: number): Promise<UserData | Error> {
  try {
    const users = await getJSONfromFile(filenames.users);
    const userArray = users.filter((u) => u.id === userId);
    if (userArray.length !== 1) {
      return { error: `Could not find user with id ${userId}`, status: 400 };
    }
    const user = userArray[0];

    const appointments = await getJSONfromFile(filenames.appointments);
    const userAppointments = Object.values(appointments).filter(
      (a) => a.userId === userId,
    );
    return { userData: user, appointments: userAppointments };
  } catch (e) {
    return { error: `Could not get user for id ${userId}: ${e}` };
  }
}

export async function addNewUser(newUserData: NewUser): Promise<User | Error> {
  try {
    const newUser = await addNewItem(filenames.users, newUserData);
    return newUser;
  } catch (e) {
    return { error: `could not add new user: ${e}` };
  }
}

export async function deleteUser(userId: number): Promise<number | Error> {
  try {
    return deleteItem(filenames.users, userId);
  } catch (e) {
    return { error: `could not delete user: ${e}` };
  }
}

export async function updateUser(userData: User): Promise<User | Error> {
  try {
    return updateItem(filenames.users, userData);
  } catch (e) {
    return { error: `could not update user: ${e}` };
  }
}

/* ********** Appointments **************** */
interface AppointmentData {
  appointments: Appointment[];
}
export async function getAppointments(): Promise<AppointmentData | Error> {
  try {
    const appointments = await getJSONfromFile(filenames.appointments);
    return { appointments };
  } catch (e) {
    return { error: `Could not read file ${e}` };
  }
}

export async function addNewAppointment(
  newAppointmentData: NewAppointment,
): Promise<Appointment | Error> {
  try {
    const newAppointment = await addNewItem(
      filenames.appointments,
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
    return deleteItem(filenames.appointments, appointmentId);
  } catch (e) {
    return { error: `could not delete appointment: ${e}` };
  }
}

export async function updateAppointment(
  appointmentData: Appointment,
): Promise<Appointment | Error> {
  try {
    return updateItem(filenames.appointments, appointmentData);
  } catch (e) {
    return { error: `could not update appointment: ${e}` };
  }
}

/* ********** Treatments **************** */
interface TreatmentData {
  treatments: Treatment[];
}
export async function getTreatments(): Promise<TreatmentData | Error> {
  try {
    const treatments = await getJSONfromFile(filenames.treatments);
    return { treatments };
  } catch (e) {
    return { error: `Could not read file ${e}` };
  }
}

export default {
  getUserData,
  addNewUser,
  deleteUser,
  updateUser,
  getAppointments,
  addNewAppointment,
  deleteAppointment,
  updateAppointment,
  getTreatments,
};
