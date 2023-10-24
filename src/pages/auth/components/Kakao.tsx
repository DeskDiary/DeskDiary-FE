import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { logo, kakao, google } from '../../../images';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie, setTokenCookie } from '../../../auth/cookie';
import { useMutation } from 'react-query';
import axios from 'axios';

type KakaoProps = {};

const Kakao: React.FC<KakaoProps> = () => {
  const token = getCookie('token');
  const navigate = useNavigate();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      setTokenCookie(token);
    }
  }, []);


  const kakaoLogin = () => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const kakaoOauthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&redirect_uri=${encodeURIComponent(
      `${SERVER_URL}/kakao-callback`,
    )}&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}`;

    // const token = response.headers.authorization.split(' ')[1];

    window.location.href = kakaoOauthURL;
  };

  return (
    <SocialLoginLink onClick={kakaoLogin}>
      <img src={kakao} />
    </SocialLoginLink>
  );
};

const SocialLoginLink = styled.button`
  width: 72px;
  height: 72px;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 130px;
`;
export default Kakao;
