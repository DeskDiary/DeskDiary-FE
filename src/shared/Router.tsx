import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideLayout from '../components/layout/auth/AuthLayout';
import MainLayout from '../components/layout/main/MainLayout';
import { Error, Home, Join, Login, Mypage, Room } from '../pages';

import CamAndMicSetting from '../pages/CamAndMicSetting';
import HobbyCategory from '../pages/category/HobbyCategory';
import StudyCategory from '../pages/category/StudyCategory';
import MyRecord from '../pages/myRecord/MyDesk';


const Router = () => {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/study" element={<StudyCategory />} />
          <Route path="/hobby" element={<HobbyCategory />} />
          <Route path="/mydesk" element={<MyRecord />} />
          <Route path="/mypage/:id" element={<Mypage />} />
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
