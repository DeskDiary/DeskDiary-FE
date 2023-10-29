import React from 'react';
import styled from 'styled-components';
import RoomList from '../home/components/RoomList';
import MainTop from '../../components/layout/main/MainTop';

type StudyCategoryProps = {};

const StudyCategory: React.FC<StudyCategoryProps> = () => {
  return (
    <Container>
      <MainTop />
      <Info>랭킹</Info>

      <Rooms>
        <RoomList label="전체 스터디룸" show="fetchStudy" />
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
export default StudyCategory;
