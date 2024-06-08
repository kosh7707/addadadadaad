import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import { PageWrapper, PageLayout } from './styled';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <ToastContainer position="bottom-right" theme="light" pauseOnHover autoClose={1000} />
      <PageWrapper>
        <PageLayout>
          <Outlet />
        </PageLayout>
      </PageWrapper>
    </>
  );
}

export default App;
