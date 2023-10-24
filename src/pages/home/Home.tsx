import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import MainTop from '../../components/layout/main/MainTop';

import { Goal, NonUserIntro } from './components';
import { getCookie, setTokenCookie } from '../../auth/cookie';
import RoomList from './components/RoomList';
import userIntro from '../../images/main/userIntro.svg';

const Home = () => {
  const token = getCookie('token');

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
  height: 100vh;
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
