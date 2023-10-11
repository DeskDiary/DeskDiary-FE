import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './shared/Router';

type AppProps = {};

const queryClient = new QueryClient();

const App: React.FC<AppProps> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};
export default App;
