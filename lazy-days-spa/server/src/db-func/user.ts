/* eslint-disable import/no-unresolved */
import { User } from '../../../shared/types';
import { AuthUser, createJWT, hashPassword, passwordIsValid } from '../auth.js';
import db from './db.js';

function removePasswordData(user: AuthUser): User {
  // use "object rest operator" to remove properties in a typescript-friendly way
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { salt, keylen, iterations, hash, digest, ...cleanUser } = user;
  return cleanUser;
}

export async function getUserDataById(userId: number): Promise<User> {
  // find the user
  const users = await db.getUsers();
  const userArray = users.filter((u) => u.id === userId);

  // throw error if not found (or more than one is found!)
  if (userArray.length !== 1) {
    throw new Error(`Could not find user with id ${userId}`);
  }

  // remove password data from user object
  const user = removePasswordData(userArray[0]);

  // get user's appointments
  const appointments = await db.getAppointments();
  const userAppointments = Object.values(appointments).filter(
    (a) => a.userId === userId,
  );

  // return user and appointments
  return { ...user, appointments: userAppointments };
}

export async function addNewUser(
  email: string,
  password: string,
): Promise<User> {
  const userPasswordData = hashPassword(password);
  const newUser = await db.addNewItem(db.filenames.users, {
    email,
    ...userPasswordData,
  });

  // create jwt
  const cleanUser = removePasswordData(newUser);
  const token = createJWT(cleanUser);

  return { ...cleanUser, token };
}

export async function deleteUser(userId: number): Promise<number> {
  return db.deleteItem(db.filenames.users, userId);
}

export async function updateUser(userData: User): Promise<User> {
  return db.updateItem(db.filenames.users, userData);
}

export async function authUser(email: string, password: string): Promise<User> {
  // auth user
  const users = await db.getUsers();
  const validUser = users.reduce(
    (foundUser: AuthUser | null, user) =>
      user.email === email && passwordIsValid(password, user)
        ? user
        : foundUser,
    null,
  );

  if (!validUser) {
    throw new Error('Invalid login data');
  }

  // create jwt
  const cleanUser = removePasswordData(validUser);
  const token = createJWT(cleanUser);

  return { ...cleanUser, token };
}
