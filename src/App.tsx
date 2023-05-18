import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './layout/Layout';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';

import './App.scss';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      query.state.data;
    },
  }),
  defaultOptions: {
    queries: {
      // ✅ globally default to 600 seconds
      staleTime: 1000 * 600,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Layout />
    </QueryClientProvider>
  );
}

export default App;
