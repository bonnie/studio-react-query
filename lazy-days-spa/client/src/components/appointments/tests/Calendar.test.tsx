/* eslint-disable no-console */
import { screen } from '@testing-library/react';
import { DefaultOptions, QueryClient, setLogger } from 'react-query';
import { defaultQueryClientOptions } from 'react-query/queryClient';
import { MemoryRouter } from 'react-router-dom';

import { renderWithClient } from '../../../test-utils';
import { Calendar } from '../Calendar';

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {
    // swallow the errors
  },
});

test('Appointment query error', async () => {
  // handler.js is set to return a 500 error for appointments
  const defaultOptions: DefaultOptions = defaultQueryClientOptions;
  if (defaultOptions && defaultOptions.queries)
    defaultOptions.queries.retry = false;

  const queryClient = new QueryClient({ defaultOptions });
  renderWithClient(
    queryClient,
    <MemoryRouter>
      <Calendar />
    </MemoryRouter>,
  );

  // check for the toast alert
  const alertToast = await screen.findByRole('alert');
  expect(alertToast).toHaveTextContent('Request failed with status code 500');
});
