import React from 'react';
import styled from 'styled-components';
import RoomList from '../home/components/RoomList';

type StudyCategoryProps = {};

const StudyCategory: React.FC<StudyCategoryProps> = () => {
  return (
    <Container col>
      <Info>랭킹</Info>

      <Rooms col>
        <RoomList label="전체 스터디룸" show="fetchStudy" />
        {/* <RoomList label="전체 스터디룸" show="fetchStudy" /> */}
      </Rooms>
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

const Rooms = styled(FlexContainer)`
width: 100%`;

const Container = styled(FlexContainer)`
  width: 1525px;
  height: 100%;
  padding-top: 30px;
`;

const Info = styled(FlexContainer)`
  width: 100%;
  height: 243px;
  border: 1px solid black;
  font-size: 40px;
  font-weight: 800;
`;
export default StudyCategory;
