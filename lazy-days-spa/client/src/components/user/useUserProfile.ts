import type { User } from '../../../../shared/types';

interface UseUserProfile {
  userData: User;
  updateUser: (userData: User) => void;
}

const fakeUser = {
  id: 1,
  name: 'Test Q. Test',
  email: 'test@test.com',
  address: '123 Main Street',
  phone: '555-555-5555',
  token: 'abc123',
};

function fakeUpdateFunction(userData: User) {
  // placeholder before ReactQuery
}

export function useUserProfile(): UseUserProfile {
  // TODO replace with React Query
  return { userData: fakeUser, updateUser: fakeUpdateFunction };
}
