// NOTE: in production this would connect to a database,
// not JSON files. However, I didn't want to make you install
// a particular database in order to use this app.
//
// This "database" is horribly inefficient and will be a problem
// when Lazy Days Spa opens to hundreds of locations globally.
import jsonPatch from 'fast-json-patch';
import { promises as fs } from 'fs';
import path from 'path';

import { Appointment, NewAppointment, Treatment } from '../../../shared/types';
import { AuthUser, NewAuthUser } from '../auth';

type JsonDataType = AuthUser | Appointment | Treatment;

const dbPath = 'db';
export enum filenames {
  users = 'users.json',
  appointments = 'appointments.json',
  treatments = 'treatments.json',
}

/* ****** Read from file ***** */
async function getJSONfromFile<T extends JsonDataType>(
  filename: filenames,
): Promise<T[]> {
  const filePath = path.join(dbPath, filename);
  const data = await fs.readFile(filePath);
  return JSON.parse(data.toString());
}

/* ****** Write to file ***** */
async function writeJSONToFile<T extends JsonDataType>(
  filename: filenames,
  data: Array<T>,
): Promise<void> {
  const filePath = path.join(dbPath, filename);
  const jsonData = JSON.stringify(data);
  await fs.writeFile(filePath, jsonData, { flag: 'w' });
}

/* ****** Add new item ***** */
// NOTE: there are issues with enums in overloads, which is why
// I don't specify exactly which filename in the overload (and
// why I didn't overload the other functions and used T instead)
// https://stackoverflow.com/questions/53848410/typescript-function-overloading-with-enum
async function addNewItem(
  filename: filenames,
  newItemData: NewAuthUser,
): Promise<AuthUser>;
async function addNewItem(
  filename: filenames,
  newItemData: NewAppointment,
): Promise<Appointment>;
async function addNewItem<T extends JsonDataType>(
  filename: filenames,
  newItemData: NewAuthUser | NewAppointment,
): Promise<AuthUser | Appointment> {
  const items = await getJSONfromFile<T>(filename);

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
async function deleteItem<T extends JsonDataType>(
  filename: filenames,
  itemId: number,
): Promise<number> {
  try {
    const items = await getJSONfromFile<T>(filename);
    const foundItemArray = items.filter((i) => i.id === itemId);
    if (foundItemArray.length !== 1) {
      throw new Error(`Could not find item id ${itemId} in ${filename}`);
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
const { applyPatch } = jsonPatch;
// eslint-disable-next-line max-lines-per-function
async function updateItem<T extends JsonDataType>(
  itemId: number,
  filename: filenames,
  // should be fast-json-patch Operation, but I can't destructure on import
  itemPatch: any[],
): Promise<T> {
  try {
    const items = await getJSONfromFile<T>(filename);

    // find the item
    const foundItems = items.filter((item) => item.id === itemId);
    if (foundItems.length !== 1) {
      throw new Error(`Could not find item with id ${itemId}`);
    }

    // apply the patch
    const updatedData = applyPatch(foundItems[0], itemPatch).newDocument;

    // write the new item data. Note: this whole function is horribly inefficient and
    // would be much improved with a real db.
    items.forEach((item, i) => {
      if (item.id === itemId) {
        items[i] = updatedData;
      }
    });

    await writeJSONToFile(filename, items);
    return updatedData;
  } catch (e) {
    throw new Error(
      `Could not delete item id ${itemId} from ${filename}: ${e}`,
    );
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  return getJSONfromFile<Appointment>(filenames.appointments);
}

export async function getTreatments(): Promise<Treatment[]> {
  return getJSONfromFile<Treatment>(filenames.treatments);
}

export function getUsers(): Promise<AuthUser[]> {
  return getJSONfromFile<AuthUser>(filenames.users);
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
