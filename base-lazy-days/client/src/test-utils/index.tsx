import { render } from '@testing-library/react';
// import { QueryClient, QueryClientProvider } from 'react-query';

// import { defaultQueryClientOptions } from '../react-query/queryClient';

// adapted from React Query tests
// https://github.com/tannerlinsley/react-query/blob/ead2e5dd5237f3d004b66316b5f36af718286d2d/src/react/tests/utils.tsx#L6-L17
// export function renderWithClient(client: QueryClient, ui: React.ReactElement) {
//   return render(
//     <QueryClientProvider client={client}>{ui}</QueryClientProvider>,
//   );
// }

// from https://tkdodo.eu/blog/testing-react-query#for-custom-hooks
// export const createWrapper = () => {
//   const queryClient = new QueryClient({
//     defaultOptions: defaultQueryClientOptions,
//   });
//   return ({ children }) => (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// };
