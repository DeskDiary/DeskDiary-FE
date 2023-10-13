import React from 'react';
import styled from 'styled-components';

type GoalProps = {};

const Goal: React.FC<GoalProps> = () => {
  return (
    <GoalDiv>
      <Title>오늘의 책상 목표</Title>
      <Content>목표의 40%(시간)이나 해냈어요.</Content>
      <GoalGraph>
        <CurrentGraph></CurrentGraph>
      </GoalGraph>
    </GoalDiv>
  );
};

const GoalDiv = styled.div`
  width: 714px;
  height: 211px;
  background: #d9d9d9;
  padding: 16px;
`;

const Title = styled.p`
  font-family: Inter;
  font-size: 24px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.24px;
  margin-bottom: 16px;
`;

const Content = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 54px */
  letter-spacing: -0.36px;
  margin-bottom: 67px;
`;

const GoalGraph = styled.div`
  width: 100%;
  background: #A9A9A9;
  height: 18px;
`

const CurrentGraph = styled.div`
  width: calc(40 * 7px);
  background: #5B5B5B;
  height: 18px;
`

export default Goal;
