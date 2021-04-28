import type { User } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';

// async function getUser(userId: number) {
//   const { data } = await axiosInstance.get(`/users/$userId`);
//   return data.user;
// }

interface UseUser {
  user: User | null;
  updateUser: (userData: User | null) => void;
}

const fakeUser = {
  id: 1,
  name: 'Test Q. Test',
  email: 'test@test.com',
  address: '123 Main Street',
  phone: '555-555-5555',
  token: 'abc123',
};

function fakeUpdateFunction(userData: User | null) {
  // placeholder before ReactQuery
}

export function useUser(): UseUser {
  // TODO replace with React Query
  return { user: fakeUser, updateUser: fakeUpdateFunction };
}
