import React from 'react';
import styled from 'styled-components';
import GoalPercentGraph from './GoalPercentGraph';

type RecordGraphProps = {};

const RecordGraph: React.FC<RecordGraphProps> = () => {
  return (
    <Body>
      <GoalPercentGraph />
      <div>
        <div>현재순위</div>
        <div>목표달성기록모음 (그래프 들어갈 곳)</div>
      </div>
    </Body>
  );
};

const Body = styled.div`
  display: flex;
  gap: 30px;
`

export default RecordGraph;
