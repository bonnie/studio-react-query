import { Request, Response } from 'express';

import { User } from '../../../shared/types';
import { AuthUser, createJWT, hashPassword, passwordIsValid } from '../auth.js';
import db from '../db-func/index.js';

function removePasswordData(user: AuthUser): User {
  // use "object rest operator" to remove properties in a typescript-friendly way
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { salt, keylen, iterations, hash, digest, ...cleanUser } = user;
  return cleanUser;
}

// eslint-disable-next-line max-lines-per-function
export async function get(req: Request, res: Response): Promise<Response> {
  try {
    const requestedId = Number(req.params.id);

    // check that the token matches the id url param (decoded token resides in req.user)
    if (req.auth?.id !== requestedId) return res.status(401);

    // find the user
    const users = await db.getUsers();
    const userArray = users.filter((u) => u.id === requestedId);

    // throw error if not found (or more than one is found!)
    if (userArray.length !== 1) {
      return res
        .status(400)
        .json({ message: `Could not find user with id ${requestedId}` });
    }

    // remove password data from user object
    const user = removePasswordData(userArray[0]);

    // get user's appointments
    const appointments = await db.getAppointments();
    const userAppointments = Object.values(appointments).filter(
      (a) => a.userId === requestedId,
    );

    // return user and appointments
    return res
      .status(200)
      .json({ user: { ...user, appointments: userAppointments } });
  } catch (e) {
    return res.status(500).json({ message: `could not get user: ${e}` });
  }
}

export async function create(req: Request, res: Response): Promise<Response> {
  try {
    const { email, password } = req.body;
    const existingUsers = await db.getUsers();
    const takenEmail = existingUsers.map((u) => u.email).includes(email);
    if (takenEmail) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    const userPasswordData = hashPassword(password);
    const newUser = await db.addNewItem(db.filenames.users, {
      email,
      ...userPasswordData,
    });

    // create jwt
    const cleanUser = removePasswordData(newUser);
    const token = createJWT(cleanUser);

    return res.status(201).json({
      user: { ...cleanUser, token },
    });
  } catch (e) {
    return res.status(500).json({ message: `could not add user: ${e}` });
  }
}

export async function remove(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    await db.deleteItem<AuthUser>(db.filenames.users, Number(id));
    return res.status(204);
  } catch (e) {
    return res.status(500).json({ message: `could not delete user: ${e}` });
  }
}

export async function update(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const { patch } = req.body;
    const updatedUser = await db.updateItem<AuthUser>(
      Number(id),
      db.filenames.users,
      patch,
    );
    return res.status(200).json({ user: updatedUser });
  } catch (e) {
    return res
      .status(500)
      .json({ message: `could not update appointment: ${e}` });
  }
}

export async function auth(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body;

  // auth user
  const users = await db.getUsers();
  const validUser = users.reduce(
    (foundUser: AuthUser | null, user) =>
      user.email === email && passwordIsValid(password, user)
        ? user
        : foundUser,
    null,
  );

  if (!validUser) return res.status(400).json({ message: 'Invalid login' });

  // create jwt
  const cleanUser = removePasswordData(validUser);
  const token = createJWT(cleanUser);

  return res.status(200).json({ user: { ...cleanUser, token } });
}

export default {
  get,
  create,
  remove,
  update,
  auth,
};
