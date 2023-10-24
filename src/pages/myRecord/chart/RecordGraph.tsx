import React from 'react';
import styled from 'styled-components';
import GoalRecoard from '../components/GoalRecoard';
import GoalPercentGraph from './GoalPercentGraph';

type RecordGraphProps = {};

const RecordGraph: React.FC<RecordGraphProps> = () => {
  return (
    <Body>
      <GoalPercentGraph />
      <GoalRecoard />
    </Body>
  );
};

const Body = styled.div`
  display: flex;
  gap: 30px;
`

export default RecordGraph;
