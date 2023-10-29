import React from 'react';
import styled from 'styled-components';
import RoomList from '../home/components/RoomList';
import MainTop from '../../components/layout/main/MainTop';

type hobbyCategoryProps = {};

const hobbyCategory: React.FC<hobbyCategoryProps> = () => {
  return (
    <Container>
      <MainTop />
      <Info>랭킹</Info>

      <Rooms>
        <RoomList label="전체 취미룸" show="fetchHobby" />
      </Rooms>
    </Container>
  );
};

const Rooms = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 1200px;
  height: 100vh;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 190px;
  border: 1px solid black;
  font-size: 40px;
  font-weight: 800;
`;

export default hobbyCategory;
