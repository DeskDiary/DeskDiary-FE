import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
        <Link to={`/signin`}>SIGN IN</Link>
        <br />
        <Link to={`/signup`}>SIGN UP</Link>
    </div>
  );
};
export default Home;
