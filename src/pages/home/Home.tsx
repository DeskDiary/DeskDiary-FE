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
import { getCookie, setTokenCookie } from '../../auth/cookie';

// interface Room {
//   uuid: number;
//   title: string;
//   category: string;
//   nowHeadcount: number;
//   maxHeadcount: number;
//   roomThumnail: { thumbnail: string };
//   createdAt: string;
//   updatedAt: string;
// }

interface Room {
  uuid: string;
  title: string;
  category: string;
  agoraAppId: string;
  agoraToken: string;
  ownerId: number;
}

const Home = () => {

  const token = getCookie('token');

  const fetchRooms = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL!}/room`,
    );
    // console.log('fetchRooms data', data);
    return data;
  };

  const { data, error, isLoading } = useQuery<Room[], Error>(
    'rooms',
    fetchRooms,
  );

  return (
    <Container col justify="start">
      {/* <삭제></삭제> */}
      <MainTop />

      <Info gap="33px" align="start">
        {token ? (
          <>
            <Goal />
            <DeskRecoder />
          </>
        ) : (
          <NonUserIntro />
        )}
      </Info>
      <List col align="start">
        <ListTitle>내가 참여했던 방</ListTitle>
        <JoinedRooms>
            {data?.map(room => {
              return <RoomCard key={room.uuid} room={room} />;
            })}
        </JoinedRooms>
      </List>
      <Link to="/join">회원가입</Link>
      <br />
      <br />
      <br />
      <Link to="/login">로그인</Link>
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

const 삭제 = styled.div`
  width: 10%;
  height: 100vh;
  background-color: gray;
  position: fixed;
  top: 0;
  left: 0;
`;

const 삭제2 = styled.div`
  width: 746.5px;
`;

const List = styled(FlexContainer)`
  margin-top: 72px;
`;

const ListTitle = styled.div`
  margin-bottom: 16px;
  font-size: 24px;
`;

const JoinedRooms = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  width: 100%;

  // 화면 크기에 따라 카드 개수 변경
  @media (max-width: 1500px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Container = styled(FlexContainer)`
  width: 1525px;
`;

const Info = styled(FlexContainer)`
  margin-top: 30px;
  width: 100%;
`;
export default Home;
