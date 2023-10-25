import React from 'react';
import styled from 'styled-components';

import 아무사진 from '../../../images/logo.svg';

type GoalPercentGraphProps = {};
const GoalPercentGraph: React.FC<GoalPercentGraphProps> = () => {
  return (
    <Body>
      <Title>오늘의 취미 목표</Title>
      <PercentImg>
        <img src={아무사진} />
        <p>40%</p>
      </PercentImg>
      <DetailTimeInfo>
        <DetailTimeInfoPBox>
          <p>목표시간</p>
          <p>5시간 00분</p>
        </DetailTimeInfoPBox>
        <DetailTimeInfoPBox>
          <p>누적시간</p>
          <p>3시간 00분</p>
        </DetailTimeInfoPBox>
      </DetailTimeInfo>

      <PageMoveButton>목표시간 채우러 가기</PageMoveButton>
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
  margin-bottom: 35px;
`;

const PercentImg = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    width: 234px;
    height: 234px;
    background-image: linear-gradient(to top, yellow 40%, grey 40%);
  }
  p {
    font-size: 30px;
    font-weight: 700;
    margin-top: 200px;
  }
`;

const DetailTimeInfo = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DetailTimeInfoPBox = styled.div`
  display: flex;
  justify-content: space-between;
  p:first-child {
    font-size: 16px;
    font-weight: 700;
  }
  p:last-child {
    font-size: 22px;
    font-weight: 700;
  }
`;

const PageMoveButton = styled.button`
  margin-left: 200px;
  margin-top: 36px;
  border: none;
  font-size: 16px;
  align-self: flex-end;
`;
export default GoalPercentGraph;
