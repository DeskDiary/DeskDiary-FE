import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Error, Home, Room, Join, Login, Mypage } from '../pages';
import MainLayout from '../components/layout/main/MainLayout';
import SideLayout from '../components/layout/auth/AuthLayout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/room" element={<Room />} />
          <Route path="/mypage" element={<Mypage />} />
        </Route>
        <Route element={<SideLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/join" element={<Join />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
