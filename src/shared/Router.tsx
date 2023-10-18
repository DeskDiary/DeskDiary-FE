import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideLayout from '../components/layout/auth/AuthLayout';
import MainLayout from '../components/layout/main/MainLayout';
import { Error, Home, Join, Login, Mypage, Room } from '../pages';

import CamAndMicSetting from '../pages/CamAndMicSetting';
import MyRecord from '../pages/myRecord/MyDesk';

const Router = () => {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mypage/:id" element={<Mypage />} />
          <Route path="/mydesk" element={<MyRecord />} />
        </Route>
        <Route element={<SideLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Route>
        <Route path="/room" element={<CamAndMicSetting />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
