import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import MainTop from '../../components/MainTop';

import { Goal, NonUserIntro} from './components';
import { getCookie, setTokenCookie } from '../../auth/cookie';
import RoomList from './components/RoomList';
import userIntro from '../../images/userIntro.png'

const Home = () => {
  const token = getCookie('token');

  return (
    <Container col justify="start">
      <MainTop />

      <Info align="center" justify="space-between">
        {token ? (
          <User justify="space-between">
            <Goal />
            <img src={userIntro}/>
          </User>
        ) : (
          <NonUserIntro />
        )}
      </Info>

      <RoomList
        label="엉덩이들이 많이 찾는 TOP 10"
        show="fetchRoomTop"
      />
    </Container>
  );
};

const FlexContainer = styled.div<{
  col?: boolean;
  align?: string;
  justify?: string;
  gap?: string;
}>`
  display: flex;
  flex-direction: ${props => (props.col ? 'column' : 'row')};
  align-items: ${props => (props.align ? props.align : 'center')};
  justify-content: ${props => (props.justify ? props.justify : 'center')};
  gap: ${props => props.gap || '0'};
`;

const Container = styled(FlexContainer)`
  width: 1525px;
  height: 100vh;
`;

const User = styled(FlexContainer)`
height: 100%;
width: 100%;
  >Img{
    height: 100%;
  }`

const Info = styled(FlexContainer)`
  width: 100%;
  height: 220px;
`;

export default Home;
