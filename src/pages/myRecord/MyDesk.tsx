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
import RecordGraph from '../mypage/RecordGraph';
import GoalRecoard from './components/GoalRecoard';

type MyDeskProps = {};

const MyDesk: React.FC<MyDeskProps> = () => {
  const fetchRooms = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL!}/room`,
    );
    console.log('fetchRooms data', data);
    return data;
  };

  const { data, error, isLoading } = useQuery<room[], Error>(
    'rooms',
    fetchRooms,
  );

  return (
    <Container col justify="start">
      <MainTop />
      <MyDeskTop justify="start">
        <RecordGraph />
      </MyDeskTop>

      {/* <MyRecords /> */}

      <List col align="start">
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
  margin-top: 30px;
  width: 100%;
`;

const ListTitle = styled.div`
  margin-bottom: 16px;
  font-size: 24px;
`;

const Container = styled(FlexContainer)`
  width: 1525px;
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
