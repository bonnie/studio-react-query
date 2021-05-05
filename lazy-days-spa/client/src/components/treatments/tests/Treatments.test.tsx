import { screen } from '@testing-library/react';
import { QueryClient } from 'react-query';

import { renderWithClient } from '../../../test-utils';
import { Treatments } from '../Treatments';

test('renders response from query', async () => {
  const queryClient = new QueryClient();
  renderWithClient(queryClient, <Treatments />);

  const treatmentTitles = await screen.findAllByRole('heading', {
    name: /massage|facial|scrub/i,
  });
  expect(treatmentTitles).toHaveLength(3);
});
