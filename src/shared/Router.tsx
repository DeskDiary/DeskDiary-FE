import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideLayout from '../components/layout/auth/AuthLayout';
import MainLayout from '../components/layout/main/MainLayout';
import { Error, Home, Join, Login, Mypage, Room } from '../pages';

import Auth from '../pages/auth/Auth';
import Lending from '../pages/auth/Lending';
import HobbyCategory from '../pages/category/HobbyCategory';
import StudyCategory from '../pages/category/StudyCategory';
import MyRecord from '../pages/myRecord/MyDesk';
import SideBar from '../components/layout/main/SideBar';
import Help from '../pages/help/Help';
import TokenRefresher from '../axios/TokenRefresher';

const Router = () => {
  return (
    <BrowserRouter>
    <TokenRefresher />
      <Routes>

        <Route path="/lending" element={<Lending />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/study" element={<StudyCategory />} />
          <Route path="/hobby" element={<HobbyCategory />} />
          <Route path="/mydesk" element={<MyRecord />} />
          <Route path="/mypage" element={<Mypage />} />
        </Route>

        <Route element={<SideLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Route>

        <Route path="/room/:id" element={<Room />} />
        <Route path="/auth" element={<Auth />} />

        {/* <Route path="/sidebartest" element={<SideBar />} /> */}
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<Error />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
