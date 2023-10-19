import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import React, { useState } from 'react';
import styled from 'styled-components';
type GoalProps = {};

const Goal: React.FC<GoalProps> = () => {
  const [current, setCurrent] = useState<number>(90);

  return (
    <GoalDiv>
      <Title>오늘의 책상 목표</Title>
      <Content>목표의 {current}%이나 해냈어요.</Content>
      <GoalGraph>
        <FlagOutlinedIcon
          style={{
            fontSize: '50px',
            position: 'absolute',
            right: '27px',
            top: '-44px',
            color: '#337CCF'
          }}
        />

        <CurrentGraph width={Math.min(current * 6.5, 682)}>
        </CurrentGraph>
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
  background: #a9a9a9;
  height: 18px;
  position: relative;
`;

const CurrentGraph = styled.div<{ width: number }>`
  width: ${props => `${props.width}px`};
  background: #5b5b5b;
  height: 18px;
  position: relative;
`;

export default Goal;
