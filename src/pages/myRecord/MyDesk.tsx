import React from 'react';
import styled from 'styled-components';
import MainTop from '../../components/MainTop';
import thumbnail from '../../images/sample.png';
import RoomCard from '../home/components/RoomCard';
import Goal from '../home/components/Goal';
import { IndexKind } from 'typescript';
import MyRecords from './components/MyRecords';

import { useRecoilValue } from 'recoil';
import { RoomAtom } from '../../recoil/RoomAtom';

import { useQuery } from 'react-query';
import axios from 'axios';

type MyDeskProps = {};

interface RoomResponse {
  result: Room[];
}

interface Room {
  uuid: string;
  title: string;
  category: string;
  agoraAppId: string;
  agoraToken: string;
  ownerId: number;
}

const MyDesk: React.FC<MyDeskProps> = () => {
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

  const fetchRooms = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL!}/room`,
    );
    console.log('fetchRooms data', data);
    return data;
  };

  const { data, error, isLoading } = useQuery<RoomResponse, Error>(
    'rooms',
    fetchRooms,
  );

  return (
    <Container col justify="start">
      <MainTop />
      <MyDeskTop justify="start">
        <Goal />
      </MyDeskTop>

      <MyRecords />

      <List col align="start">
        <ListTitle>최근에 들어간 방 목록</ListTitle>
        <JoinedRooms>
          {data ? (
            data?.result.map(room => {
              return <RoomCard key={room.uuid} room={room} />;
            })
          ) : (
            <></>
          )}
        </JoinedRooms>
      </List>
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
  width: 100%;
`;

const MyDeskTop = styled(FlexContainer)`
  margin: 30px 0 24px 0;
`;

const List = styled(FlexContainer)`
  margin-top: 72px;
  width: 100%;
`;

const ListTitle = styled.div`
  margin-bottom: 16px;
  font-size: 24px;
`;

const Container = styled(FlexContainer)`
  width: 70%;
  height: 100%;
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

export default MyDesk;
