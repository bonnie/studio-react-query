import type { User } from '../../../../shared/types';
import { useAuth } from '../../auth/useAuth';

interface UseUserProfile {
  userData: User;
}

const fakeUser = {
  id: 1,
  name: 'Test Q. Test',
  email: 'test@test.com',
  address: '123 Main Street',
  phone: '555-555-5555',
  token: 'abc123',
};

export function useUserProfile(): UseUserProfile {
  const { user } = useAuth();

  // TODO replace with React Query
  return { userData: fakeUser };
}
