import { rest } from 'msw';

import {
  mockAppointments,
  mockStaff,
  mockTreatments,
  mockUser,
  mockUserAppointments,
} from './mockData';

export const handlers = [
  rest.get('http://localhost:3030/treatments', mockTreatments),
];
