import React from 'react';
import styled from 'styled-components';
import MainTop from '../../components/layout/main/MainTop';
import RoomCard from '../home/components/RoomCard';

import { useQuery } from 'react-query';
import axios from 'axios';
import RecordGraph from '../mypage/RecordGraph';


type MyDeskProps = {};

const MyDesk: React.FC<MyDeskProps> = () => {
  const fetchRooms = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL!}/my-rooms`,
    );
    console.log('fetchRooms data', data);
    return data;
  };

  const { data, error, isLoading } = useQuery<room[], Error>(
    'rooms',
    fetchRooms,
  );

  return (
    <Container>
      <MainTop />
      <MyDeskTop>
        <RecordGraph />
      </MyDeskTop>


      <List>
        <ListTitle>최근에 들어간 방 목록</ListTitle>
        <JoinedRooms>
          {data ? (
            data.map(room => {
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

const MyDeskTop = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;

  margin: 30px 0 24px 0;
`;

const List = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: start;

  margin-top: 30px;
  width: 100%;
`;

const ListTitle = styled.div`
  margin-bottom: 16px;
  font-size: 24px;
`;

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: start;
align-items: center;

  width: 1200px;
  height: 100vh;
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
