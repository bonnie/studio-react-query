import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "./App.css";
import { InfinitePeople } from "./InfinitePeople";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    // provide React Query client to App
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Infinite SWAPI</h1>
        <InfinitePeople />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
