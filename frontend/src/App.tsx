import React from 'react';
import { ToastContainer } from 'react-toastify';

import Router from './router/Router';
import Header from './components/Header';
import { PageWrapper, PageLayout } from './styled';

function App() {
  return (
    <>
      <Header />
      <PageWrapper>
        <PageLayout>
          <Router />
        </PageLayout>
      </PageWrapper>
      <ToastContainer position="bottom-right" theme="light" pauseOnHover autoClose={1000} />
    </>
  );
}

export default App;
