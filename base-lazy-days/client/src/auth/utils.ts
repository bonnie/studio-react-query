import { User } from '../../../shared/types';
import { USER_LOCALSTORAGE_KEY } from './constants';

// helper to get user from localstorage
export function getStoredUser(): User | null {
  const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

export function setStoredUser(user: User): void {
  localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
}

export function deleteStoredUser(): void {
  localStorage.removeItem(USER_LOCALSTORAGE_KEY);
}
