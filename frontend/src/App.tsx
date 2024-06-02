import React from "react";
import Router from "./router/Router";
import Header from "./components/Header";
import { PageWrapper, PageLayout } from "./styled";

function App() {
  return (
    <>
      <Header />
      <PageWrapper>
        <PageLayout>
          <Router />
        </PageLayout>
      </PageWrapper>
    </>
  );
}

export default App;
