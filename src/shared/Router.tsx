import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import SideLayout from '../components/layout/SideLayout';
import { Error, Home, Join, Login, Mypage, Room } from '../pages';

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
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
