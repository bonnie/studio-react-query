import { fireEvent, screen } from '@testing-library/react';
import { QueryClient } from 'react-query';
import { MemoryRouter } from 'react-router-dom';

import { mockUser } from '../../../mocks/mockData';
import { renderWithClient } from '../../../test-utils';
import mockUseCustomToast from '../../app/hooks/useCustomToast';
import { Calendar } from '../Calendar';

const s = jest.mock('../../app/hooks/useCustomToast');

// mocking useUser to mimic a logged-in user
jest.mock('../../user/hooks/useUser', () => ({
  __esModule: true,
  useUser: () => ({ user: mockUser }),
}));

test.skip('Reserve appointment', async () => {
  renderWithClient(
    <MemoryRouter>
      <Calendar />
    </MemoryRouter>,
  );

  // find all the appointments
  const appointments = await screen.findAllByRole('button', {
    name: /\d\d? [ap]m\s+(scrub|facial|massage)/i,
  });

  // click on the first one to reserve
  fireEvent.click(appointments[0]);

  // check for the toast alert
  // const alertToast = await screen.findByRole('alert');
  // expect(alertToast).toHaveTextContent('reserve');
  console.log('schmocks', mockUseCustomToast);
  console.log('usey', mockUseCustomToast.useCustomToast);
  expect(mockUseCustomToast.mockToast).toHaveBeenCalledWith({
    title: 'You have reserved the appointment!',
    status: 'success',
  });
});

test.skip('Cancel appointment', async () => {
  renderWithClient(
    <MemoryRouter>
      <Calendar />
    </MemoryRouter>,
  );

  // find all the cancel buttons
  const cancelButtons = await screen.findAllByRole('button', {
    name: /cancel appointment/i,
  });

  // click on the first one to cancel
  fireEvent.click(cancelButtons[0]);

  // check for the toast alert
  const alertToast = await screen.findByRole('alert');
  expect(alertToast).toHaveTextContent('cancel');
});
