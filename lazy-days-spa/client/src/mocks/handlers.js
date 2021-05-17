import { rest } from 'msw';

import {
  mockAppointments,
  mockStaff,
  mockTreatments,
  mockUser,
  mockUserAppointments,
} from './mockData';

export const handlers = [
  rest.get('http://localhost:3333/treatments', (req, res, ctx) => {
    return res(ctx.json(mockTreatments));
  }),
  rest.get('http://localhost:3333/staff', (req, res, ctx) => {
    return res(ctx.json(mockStaff));
  }),
  rest.get(
    'http://localhost:3333/appointments/:month/:year',
    (req, res, ctx) => {
      return res(ctx.json({ appointments: mockAppointments }));
    },
  ),
  rest.get('http://localhost:3333/user/:id/appointments', (req, res, ctx) => {
    return res(ctx.json({ appointments: mockUserAppointments }));
  }),
  rest.patch('http://localhost:3333/appointment/:id', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
