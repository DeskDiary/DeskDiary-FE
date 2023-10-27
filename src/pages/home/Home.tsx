import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import MainTop from '../../components/layout/main/MainTop';

import { Goal, NonUserIntro } from './components';
import { getCookie } from '../../auth/cookie';
import RoomList from './components/RoomList';
import userIntro from '../../images/main/userIntro.svg';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();

  console.log('홈화면 렌더링');
  const token = getCookie('token');

  useEffect(() => {
    const visited = window.localStorage.getItem('visited');
    if (!visited) {
      navigate("/lending")
    }
    console.log(visited)
  }, []);

  return (
    <Container>
      <MainTop />

      <Info>
        {token ? (
          <User>
            <Goal />
            <img src={userIntro} alt="user " />
          </User>
        ) : (
          <NonUserIntro />
        )}
      </Info>

      <RoomList label="엉덩이들이 많이 찾는 TOP 10" show="fetchRoomTop" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 1200px;
  min-height: 100vh;
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 100%;
  width: 100%;
  > Img {
    width: 50%;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

export default Home;
