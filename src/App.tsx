import React, {useEffect, useState} from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import GlobalStyle from './GlobalStyle';
import Router from './shared/Router';
import Toaster from './toast';

type AppProps = {};

const queryClient = new QueryClient();
const App: React.FC<AppProps> = () => {

  useEffect(() => {
    if (window.localStorage.getItem('visited') !== 'true') {
      window.location.href = '/lending';
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <GlobalStyle />
      <Router />
    </QueryClientProvider>
  );
};
export default App;
