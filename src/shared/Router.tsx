import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SideLayout from '../components/layout/auth/AuthLayout';
import MainLayout from '../components/layout/main/MainLayout';
import { Error, Home, Join, Login, Mypage, Room } from '../pages';

import CamAndMicSetting from '../pages/CamAndMicSetting';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<Mypage />} />
        </Route>
        <Route element={<SideLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/join" element={<Join />} />
        </Route>
        <Route path="/room" element={<CamAndMicSetting />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
