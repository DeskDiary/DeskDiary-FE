import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from '../pages/Error';
import Home from '../pages/Home';
import Room from '../pages/Room';
import Signin from '../pages/SignIn';
import SignUp from '../pages/SignUp';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/room" element={<Room />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;