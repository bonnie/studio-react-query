import type { User } from '../../../../../shared/types';
import { getStoredUser } from '../../../auth/utils';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';

// async function getUser(userId: number | undefined): Promise<User | null> {
//   if (!userId) return null;
//   const { data } = await axiosInstance.get(`/users/$userId`);
//   return data.user;
// }

const fakeUser = {
  id: 1,
  name: 'Test Q. Test',
  email: 'test@test.com',
  address: '123 Main Street',
  phone: '555-555-5555',
  token: 'abc123',
};

interface UseUser {
  user: User | null;
}

export function useUser(): UseUser {
  return { user: fakeUser };
}
