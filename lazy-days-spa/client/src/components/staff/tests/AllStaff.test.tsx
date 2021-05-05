import { screen } from '@testing-library/react';
import { QueryClient } from 'react-query';

import { renderWithClient } from '../../../test-utils';
import { AllStaff } from '../AllStaff';

test('renders response from query', async () => {
  const queryClient = new QueryClient();
  renderWithClient(queryClient, <AllStaff />);

  const staffNames = await screen.findAllByRole('heading', {
    name: /divya|sandra|michael|mateo/i,
  });
  expect(staffNames).toHaveLength(4);
});
