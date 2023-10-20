import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { RoomAtom } from '../../recoil/RoomAtom';

import MainTop from '../../components/MainTop';
import { DeskRecoder, Goal, NonUserIntro, RoomCard } from './components';
import thumbnail from '../../images/sample.png';
import nonUserInfo from '../../images/nonUserInfo.png';
import { getCookie, setTokenCookie } from '../../auth/cookie';
import RoomList from './components/RoomList';

import { useRecoilState } from 'recoil';
import { SelectCateoryAtom } from '../../recoil/RoomAtom';
import userIntro from '../../images/userIntro.png'

const Home = () => {
  const token = getCookie('token');

  const fetchRooms = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL!}/room`,
    );
    // console.log('fetchRooms data', data);
    return data;
  };

  return (
    <Container col justify="start">
      <MainTop />

      <Info align="center" justify="space-between">
        {token ? (
          <>
            <Goal />
            <img src={userIntro}/>
          </>
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
`;

const Info = styled(FlexContainer)`
  width: 100%;
`;
export default Home;
