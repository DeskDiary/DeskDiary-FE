import React from 'react';
import styled from 'styled-components';
import 팔레트 from '../../images/mypage/palette.svg';

type GoalPercentGraphProps = {};

const GoalPercentGraph: React.FC<GoalPercentGraphProps> = () => {
  return (
    <Body>
      <Title>오늘의 취미 목표</Title>
      <PercentImg>
        <img src={팔레트} alt="" />
        <p>38%</p>
      </PercentImg>
      <div>
        <p>목표시간</p>
        <p>4시간 30분</p>
      </div>
      <div>
        <p>누적시간</p>
        <p>1시간 42분</p>
      </div>
      <p>목표시간 채우러 가기</p>
    </Body>
  );
};

const Body = styled.div`
  width: 378px;
  height: 478px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 2px 4px 9px 0px rgba(0, 0, 0, 0.25);
  padding: 20px;
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
export default GoalPercentGraph;
