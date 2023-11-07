import React from 'react';
import styled from 'styled-components';
import GoalRecoard from '../components/GoalRecoard';
import Level from '../components/Level';
import GoalPercentGraph from './GoalPercentGraph';
import help from '../../../images/room/help_outline.svg';
type RecordGraphProps = {};

const RecordGraph: React.FC<RecordGraphProps> = () => {
  return (
    <Body>
      <GoalPercentGraph />
      <ChartBox>
        <Level />
        <GoalRecoard />
        <Help>
          <img src={help} alt="help" />
          <p>
            일주일 기록은 오늘 기준으로 6일 전까지의 데이터를 불러오고, 한달기록은 오늘기준으로 29일 전까지의 데이터를 불러옵니다.
          </p>
        </Help>
      </ChartBox>
    </Body>
  );
};

const Body = styled.div`
  display: flex;
  gap: 30px;
`;

const ChartBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Help = styled.div`
  display: flex;
  gap: 10px;
  p {
    font-size: 13px;
    line-height: 100%;
    color: black;
    display: none;
    margin-top: -33px;
    height: 12px;
    background-color: white;
  }
  &:hover {
    p {
      display: flex;
    }
  }
  img {
    margin-top: -55px;
    margin-left: 10px;
  }
`;
export default RecordGraph;
