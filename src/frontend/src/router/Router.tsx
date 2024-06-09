import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Follow from '../pages/Follow';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/follow" element={<Follow />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
