import { Appointment, User } from '../../../shared/types';
import { AuthUser, createJWT, hashPassword, passwordIsValid } from '../auth';
import db, { Error } from '.';

function removePasswordData(user: AuthUser): User {
  const cleanUser = { ...user };
  delete cleanUser.salt;
  delete cleanUser.keylen;
  delete cleanUser.iterations;
  delete cleanUser.hash;
  delete cleanUser.digest;
  return cleanUser;
}

interface UserData {
  userData: User;
  appointments: Appointment[];
}
export async function getUserDataById(
  userId: number,
): Promise<UserData | Error> {
  try {
    const users = await db.getUsers();
    const userArray = users.filter((u) => u.id === userId);
    if (userArray.length !== 1) {
      return { error: `Could not find user with id ${userId}`, status: 400 };
    }
    const user = removePasswordData(userArray[0]);

    const appointments = await db.getAppointments();
    const userAppointments = Object.values(appointments).filter(
      (a) => a.userId === userId,
    );
    return { userData: user, appointments: userAppointments };
  } catch (e) {
    return { error: `Could not get user for id ${userId}: ${e}` };
  }
}

export async function addNewUser(
  email: string,
  password: string,
): Promise<User | Error> {
  try {
    const userPasswordData = hashPassword(password);
    const newUser = await db.addNewItem(db.filenames.users, {
      email,
      ...userPasswordData,
    });
    return removePasswordData(newUser);
  } catch (e) {
    return { error: `could not add new user: ${e}` };
  }
}

export async function deleteUser(userId: number): Promise<number | Error> {
  try {
    return db.deleteItem(db.filenames.users, userId);
  } catch (e) {
    return { error: `could not delete user: ${e}` };
  }
}

export async function updateUser(userData: User): Promise<User | Error> {
  try {
    return db.updateItem(db.filenames.users, userData);
  } catch (e) {
    return { error: `could not update user: ${e}` };
  }
}

export async function authUser(
  email: string,
  password: string,
): Promise<User | Error> {
  // auth user
  const users = await db.getUsers();
  const validUser = users.reduce(
    (foundUser, user) =>
      user.email === email && passwordIsValid(password, user)
        ? user
        : foundUser,
    null,
  );

  if (!validUser) {
    return { error: 'Invalid login data', status: 401 };
  }

  // create jwt
  const cleanUser = removePasswordData(validUser);
  const token = createJWT(cleanUser);

  return { ...cleanUser, token };
}
