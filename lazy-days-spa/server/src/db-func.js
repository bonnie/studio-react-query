import fs from 'fs/promises';
import path from 'path';

const dbPath = '../db';
const filenames = {
  users: 'users.json',
};

async function getJSONfromFile(filename) {
  try {
    const filePath = path.join(dbPath, filename);
    const data = await fs.readFile(filePath);
    return JSON.parse(data);
  } catch (e) {
    return { error: `Could not read file ${e}` };
  }
}

export async function getUserData(userId) {
  const users = await getJSONfromFile(filenames.users);
}
