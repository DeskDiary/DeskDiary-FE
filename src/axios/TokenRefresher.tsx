import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  getCookie,
  setTokenCookie,
  getRefreshTokenCookie,
} from '../auth/cookie';

type TokenRefresherProps = {};

const TokenRefresher: React.FC<TokenRefresherProps> = () => {
  const navigate = useNavigate();
  const refreshToken = getRefreshTokenCookie('refreshToken');

  useEffect(() => {
    console.log('리프레시토큰', refreshToken);
    const interceptor = axios.interceptors.response.use(
      response => {
        console.log('response', response);
        return response;
      },
      async error => {
        console.log('error🤗🤗', error);
        const originalConfig = error.config; // 기존에 수행하려고 했던 작업
        const msg = error.response.data.message;
        const status = error.response.status;

        if (status == 401) {
          console.log('if1🤗🤗');
          if (msg.includes('Unauthorized')) {
            console.log('if2🤗🤗');
            try {
              console.log('try🤗🤗');
              const serverUrl = process.env.REACT_APP_SERVER_URL;

              // 리프레시 토큰을 서버에 보내 새 엑세스 토큰 요청
              // const { data } = await axios.post(`${serverUrl}/refresh`,refreshToken);

              const { data } = await axios.post(`${serverUrl}/refresh`, {}, { withCredentials: true });
              console.log('data🤗🤗', data);
              // 새 엑세스 토큰으로 쿠키 업데이트
              setTokenCookie(data.accessToken);

              // 새 엑세스 토큰으로 원래 요청 재시도
              originalConfig.headers[
                'Authorization'
              ] = `Bearer ${data.accessToken}`;

              // axios 인스턴스를 사용하여 원래 요청 재시도
              return axios(originalConfig);
            } catch (_error) {
              // 리프레시 토큰도 만료되었거나 유효하지 않을 때 로그인 페이지로 이동
              navigate('/login');
              return Promise.reject(_error);
            }
          }
        }
        return Promise.reject(error);
      },
    );
    // 클린업 함수로 인터셉터 해제하기
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [refreshToken]);

  return <div></div>;
};
export default TokenRefresher;
