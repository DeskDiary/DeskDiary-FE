import React, { useEffect } from 'react';
import { getCookie, setTokenCookie } from '../../auth/cookie';

type authProps = {};

const auth: React.FC<authProps> = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    setTokenCookie(accessToken!);
    window.history.replaceState({}, document.title, '/');
  }, []);
  return <div>Have a good coding</div>;
};
export default auth;
