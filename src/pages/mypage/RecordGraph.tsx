import React from 'react';
import styled from 'styled-components';
import GoalPercentGraph from './GoalPercentGraph';
import GoalRecoard from '../myRecord/components/GoalRecoard';

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
