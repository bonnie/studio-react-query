import { User } from '../../../shared/types';
import { USER_LOCALSTORAGE_KEY } from '../constants';

// helper to get user from localstorage
export function getStoredUser(): User | null {
  const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}
