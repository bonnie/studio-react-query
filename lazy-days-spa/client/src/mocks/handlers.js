import { rest } from 'msw';

import {
  mockAppointments,
  mockStaff,
  mockTreatments,
  mockUser,
  mockUserAppointments,
} from './mockData';

export const handlers = [
  rest.get('http://localhost:3030/treatments', (req, res, ctx) => {
    return res(ctx.json(mockTreatments));
  }),
  rest.get('http://localhost:3030/staff', (req, res, ctx) => {
    return res(ctx.json(mockStaff));
  }),
  rest.get(
    'http://localhost:3030/appointments/:month/:year',
    (req, res, ctx) => {
      return res(ctx.status(500));
    },
  ),
];
