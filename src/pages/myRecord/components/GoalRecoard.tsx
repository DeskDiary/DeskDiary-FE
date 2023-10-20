import React from 'react';
import styled from 'styled-components';
import study from '../../../images/main/study.svg'

type GoalRecoardProps = {
  
};

const GoalRecoard:React.FC<GoalRecoardProps> = () => {
  
  return <Body>
  <Title>목표 달성 기록 모음</Title>
  <PercentImg>
    <img src={study} alt="" />
    <p>38%</p>
  </PercentImg>
</Body>
}

const Body = styled.div`
  width: 790px;
  height: 320px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 2px 4px 9px 0px rgba(0, 0, 0, 0.25);
  padding: 20px;
  margin-top: auto;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

const PercentImg = styled.div`
  display: flex;
  img {
    width: 234px;
    height: 234px;
  }
`;
export default GoalRecoard;