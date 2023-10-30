import React from 'react';
import styled from 'styled-components';
import GoalRecoard from '../components/GoalRecoard';
import Level from '../components/Level';
import GoalPercentGraph from './GoalPercentGraph';

type RecordGraphProps = {};

const RecordGraph: React.FC<RecordGraphProps> = () => {
  return (
    <Body>
      <GoalPercentGraph />
      <ChartBox>
        <Level />
        <GoalRecoard />
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

export default RecordGraph;
