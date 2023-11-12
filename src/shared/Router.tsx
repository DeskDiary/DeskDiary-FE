import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideLayout from '../components/layout/auth/AuthLayout';
import MainLayout from '../components/layout/main/MainLayout';

import { Suspense, lazy } from 'react';
const Lending = lazy(() => import('../pages/auth/Lending'));
const ConfirmEmailNotice = lazy(() => import('../pages/auth/ConfirmEmailNotice'));
const Help = lazy(() => import('../pages/help/Help'));
const Mypage = lazy(() => import('../pages/mypage/Mypage'));
const Login = lazy(() => import('../pages/auth/Login'));
const Auth = lazy(() => import('../pages/auth/Auth'));
const Error = lazy(() => import('../pages/Error'));
const Home = lazy(() => import('../pages/home/Home'));
const Room = lazy(() => import('../pages/room/Room'));
const Join = lazy(() => import('../pages/auth/Join'));
const HobbyCategory = lazy(() => import('../pages/category/HobbyCategory'));
const StudyCategory = lazy(() => import('../pages/category/StudyCategory'));
const MyRecord = lazy(() => import('../pages/myRecord/MyDesk'));


const Router = () => {
  return (
    <BrowserRouter>
      {/* <TokenRefresher /> */}
      <Routes>
        <Route path="/lending" element={<Lending />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={ <Suspense fallback={ <div>Home Loading...</div>}><Home /></Suspense> } />
          <Route path="/study" element={ <Suspense fallback={<div>Study Loading...</div>}><StudyCategory /></Suspense> } />
          <Route path="/hobby" element={ <Suspense fallback={<div>Hobby Loading...</div>}><HobbyCategory /></Suspense> } />
          <Route path="/mydesk" element={ <Suspense fallback={<div>MyRecord Loading...</div>}><MyRecord /></Suspense> } />
          <Route path="/mypage" element={ <Suspense fallback={<div>Mypage Loading...</div>}><Mypage /></Suspense> } />
        </Route>

        <Route element={<SideLayout />}>
          <Route path="/login" element={<Suspense fallback={<div>Login Loading...</div>}><Login /></Suspense> } />
          <Route path="/join" element={<Suspense fallback={<div>Join Loading...</div>}><Join /></Suspense>} />
        </Route>

        <Route path="/room/:id" element={ <Suspense fallback={<div>Room Loading...</div>}><Room /></Suspense>} />
        <Route path="/auth" element={ <Suspense fallback={<div>Auth Loading...</div>}><Auth /></Suspense> } />

        <Route path="/confirm-email" element={ <Suspense fallback={<div>ConfirmEmailNotice Loading...</div>}><ConfirmEmailNotice /></Suspense>} />
        <Route path="/help" element={ <Suspense fallback={<div>Help Loading...</div>}><Help /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<div>Error Loading...</div>}><Error /></Suspense>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
