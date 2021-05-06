/* eslint-disable no-console */

import { render } from '@testing-library/react';
import {
  DefaultOptions,
  QueryClient,
  QueryClientProvider,
  setLogger,
} from 'react-query';

import { defaultQueryClientOptions } from '../react-query/queryClient';

// suppress errors written to console
setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {
    // swallow the errors
  },
});

const defaultOptions: DefaultOptions = defaultQueryClientOptions;
if (defaultOptions && defaultOptions.queries)
  defaultOptions.queries.retry = false;

// make this a function for unique queryClient per test
const generateQueryClient = () => {
  return new QueryClient({ defaultOptions });
};

// adapted from React Query tests
// https://github.com/tannerlinsley/react-query/blob/ead2e5dd5237f3d004b66316b5f36af718286d2d/src/react/tests/utils.tsx#L6-L17
export function renderWithClient(
  ui: React.ReactElement,
  client: QueryClient = generateQueryClient(),
) {
  return render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>,
  );
}

// from https://tkdodo.eu/blog/testing-react-query#for-custom-hooks
export const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: defaultQueryClientOptions,
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
