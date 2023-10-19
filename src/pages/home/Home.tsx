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
  const rooms = [
    {
      id: 1,
      title: '방 타이틀1',
      category: 'study',
      nowHeadcount: 2,
      maxHeadcount: 4,
      roomThumnail: { thumbnail },
      createdAt: '2023-10-10',
      updatedAt: '2023-10-11',
    },
    {
      id: 2,
      title: '방 타이틀2',
      category: 'music',
      nowHeadcount: 1,
      maxHeadcount: 3,
      roomThumnail: { thumbnail },
      createdAt: '2023-10-09',
      updatedAt: '2023-10-10',
    },
    {
      id: 3,
      title: '방 타이틀3',
      category: 'movie',
      nowHeadcount: 4,
      maxHeadcount: 5,
      roomThumnail: { thumbnail },
      createdAt: '2023-10-08',
      updatedAt: '2023-10-09',
    },
    {
      id: 4,
      title: '방 타이틀4',
      category: 'game',
      nowHeadcount: 3,
      maxHeadcount: 4,
      roomThumnail: { thumbnail },
      createdAt: '2023-10-07',
      updatedAt: '2023-10-08',
    },
    {
      id: 5,
      title: '방 타이틀5',
      category: 'hobby',
      nowHeadcount: 2,
      maxHeadcount: 3,
      roomThumnail: { thumbnail },
      createdAt: '2023-10-06',
      updatedAt: '2023-10-07',
    },
    {
      id: 6,
      title: '방 타이틀6',
      category: 'reading',
      nowHeadcount: 1,
      maxHeadcount: 2,
      roomThumnail: { thumbnail },
      createdAt: '2023-10-05',
      updatedAt: '2023-10-06',
    },
    {
      id: 7,
      title: '방 타이틀7',
      category: 'exercise',
      nowHeadcount: 4,
      maxHeadcount: 5,
      roomThumnail: { thumbnail },
      createdAt: '2023-10-04',
      updatedAt: '2023-10-05',
    },
    {
      id: 8,
      title: '방 타이틀8',
      category: 'travel',
      nowHeadcount: 3,
      maxHeadcount: 4,
      roomThumnail: { thumbnail },
      createdAt: '2023-10-03',
      updatedAt: '2023-10-04',
    },
    {
      id: 9,
      title: '방 타이틀9',
      category: 'food',
      nowHeadcount: 2,
      maxHeadcount: 3,
      roomThumnail: { thumbnail },
      createdAt: '2023-10-02',
      updatedAt: '2023-10-03',
    },
    {
      id: 10,
      title: '방 타이틀10',
      category: 'discussion',
      nowHeadcount: 1,
      maxHeadcount: 2,
      roomThumnail: { thumbnail },
      createdAt: '2023-10-01',
      updatedAt: '2023-10-02',
    },
  ];

  const token = getCookie('token');

  const fetchRooms = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL!}/room`,
    );
    console.log('fetchRooms data', data);
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
  width: 70%;
`;

const Info = styled(FlexContainer)`
  margin-top: 30px;
  width: 100%;
`;
export default Home;
