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
} from '../../../shared/types';
import { AuthUser, PasswordHash } from '../auth';

const dbPath = '../db';
export enum filenames {
  users = 'users.json',
  appointments = 'appointments.json',
  treatments = 'treatments.json',
}

/* ****** Read from file ***** */
async function getJSONfromFile(filename: filenames.users): Promise<AuthUser[]>;
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
  newItemData: NewUser & PasswordHash,
): Promise<AuthUser>;
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
): Promise<number>;
async function deleteItem(
  filename: filenames.appointments,
  itemId: number,
): Promise<number>;
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
    throw new Error(
      `Could not delete item id ${itemId} from ${filename}: ${e}`,
    );
  }
}

/* ****** Update item ***** */
async function updateItem(
  filename: filenames.users,
  updatedItemData: User,
): Promise<AuthUser>;
async function updateItem(
  filename: filenames.appointments,
  updatedItemData: Appointment,
): Promise<Appointment>;
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
    throw new Error(
      `Could not delete item id ${updatedItemData.id} from ${filename}: ${e}`,
    );
  }
}

interface AppointmentData {
  appointments: Appointment[];
}
export async function getAppointments(): Promise<AppointmentData> {
  try {
    const appointments = await getJSONfromFile(filenames.appointments);
    return { appointments };
  } catch (e) {
    throw new Error(`Could not read file ${e}`);
  }
}

export async function getTreatments(): Promise<Treatment[]> {
  return getJSONfromFile(filenames.treatments);
}

export function getUsers(): Promise<AuthUser[]> {
  return getJSONfromFile(filenames.users);
}

export default {
  filenames,
  addNewItem,
  deleteItem,
  updateItem,
  getUsers,
  getAppointments,
  getTreatments,
};
