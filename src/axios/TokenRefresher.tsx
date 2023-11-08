import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getCookie, getRefreshTokenCookie } from '../auth/cookie';

type TokenRefresherProps = {};

const TokenRefresher: React.FC<TokenRefresherProps> = () => {
  const navigate = useNavigate();
  const refreshToken = getRefreshTokenCookie('refreshToken');

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        const originalConfig = error.config; // 기존에 수행하려고 했던 작업
        const msg = error.response.data.message;
        const status = error.response.status;

        if (status == 401) {
          // if(mag === '') {
          try {
            // 환경 변수에서 서버 URL 가져오기 (REACT_APP_SERVER_URL 환경변수 필요)
            const serverUrl = process.env.REACT_APP_SERVER_URL;

            // 리프레시 토큰을 서버에 보내 새 엑세스 토큰 요청
            const { data } = await axios.post(`${serverUrl}/refresh`, {
              refreshToken,
            });

            // 새 엑세스 토큰으로 원래 요청 재시도
            originalConfig.headers[
              'accessToken'
            ] = `Bearer ${data.accessToken}`;

            // axios 인스턴스를 사용하여 원래 요청 재시도
            return axios(originalConfig);
          } catch (_error) {
            // 리프레시 토큰도 만료되었거나 유효하지 않을 때 로그인 페이지로 이동
            navigate('/login');
            return Promise.reject(_error);
          }
          // }
        }
        return Promise.reject(error);
      },
    );
    // 클린업 함수로 인터셉터 해제하기
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate, refreshToken]);

  return <div>Have a good coding</div>;
};
export default TokenRefresher;
