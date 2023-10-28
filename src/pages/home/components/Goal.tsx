import React, { useState } from 'react';
import styled from 'styled-components';
type GoalProps = {};

const Goal: React.FC<GoalProps> = () => {
  const [current, setCurrent] = useState<number>(90);

  return (
    <Container>
      <GoalDiv>
        <Title>오늘의 책상 목표</Title>
        <Content>
          <p>0시간 10분</p>
          <p>목표 0시간 0분</p>
        </Content>
      </GoalDiv>
      <GoalGraph>
        <CurrentGraph width={Math.min(30, 100)}></CurrentGraph>
      </GoalGraph>
    </Container>
    // <FlagOutlinedIcon
    //       style={{
    //         fontSize: '50px',
    //         position: 'absolute',
    //         right: '27px',
    //         top: '-44px',
    //         color: '#337CCF'
    //       }}
    //     />
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const GoalDiv = styled.div`
  width: 583px;
  height: 149px;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.25px;
  margin-bottom: 40px;
`;

const Content = styled.p`
  display: flex;
  justify-content: space-between;
  p:first-child {
    font-size: 40px;
    font-weight: 700;
    color: var(--primary-01);
  }
  p:last-child {
    font-size: 24px;
    color: var(--gray-07);
  }
`;

const GoalGraph = styled.div`
  width: 100%;
  border-radius: 5px;
  background: var(--gray-04, #e0e0e0);
  height: 18px;
`;

const CurrentGraph = styled.div<{ width: number }>`
  width: ${props => `${props.width}%`};
  border-radius: 5px;
  background: var(--primary-00, #1a81e8);
  height: 18px;
  position: relative;
`;

export default Goal;
