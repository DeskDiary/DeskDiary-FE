import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import SideLayout from '../components/layout/SideLayout';
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
