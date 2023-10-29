import React from 'react';

import styled from 'styled-components';
import MainTop from '../../components/layout/main/MainTop';

import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getCookie } from '../../auth/cookie';
import { GoalTimeModalState } from '../../recoil/DeskAtom';
import GoalSetTimeModal from './chart/GoalSetTimeModal';
import RecordGraph from './chart/RecordGraph';
import RoomList from './components/RoomList';


type MyDeskProps = {};

const MyDesk: React.FC<MyDeskProps> = () => {
  const [GoalModal, setGoalModal] = useRecoilState<boolean>(GoalTimeModalState);

  return (
    <Container>
      <MainTop />
      <MyDeskTop>
        <RecordGraph />
      </MyDeskTop>

      <RoomList label="최근에 들어간 방 목록" mydesk="fetchJoinRoom"/>
      <RoomList label="내가 만든 방 목록" mydesk="fetchCreatedRoom"/>
      {
        GoalModal && <GoalSetTimeModal />
      }
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
