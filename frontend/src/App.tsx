import React from 'react';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header';
import { PageWrapper, PageLayout } from './styled';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <PageWrapper>
        <PageLayout>
          <Outlet />
        </PageLayout>
      </PageWrapper>
      <ToastContainer position="bottom-right" theme="light" pauseOnHover autoClose={1000} />
    </>
  );
}

export default App;
