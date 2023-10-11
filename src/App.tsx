import React from 'react';
import Router from './shared/Router';
import GlobalStyle from './GlobalStyle';
import Toaster from "./toast";

type AppProps = {};

const App: React.FC<AppProps> = () => {
  return (
    <section>
      <Toaster position="top-center" />
      <GlobalStyle />
      <Router />
    </section>
  );
};
export default App;
