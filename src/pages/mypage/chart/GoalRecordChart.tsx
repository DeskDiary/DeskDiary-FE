import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '목표 달성 기록 모음',
    },
  },
};

const labels = ['일', '월', '화', '수', '목', '금', '토'];

const data = {
  labels,
  datasets: [
    {
      label: 'My First Dataset1',
      data: [1,2,3,4,5,6,7],
      stack: 'stack1',
      backgroundColor: ['#757575'],
      // barThickness: 10
    },
    {
      label: 'My First Dataset2',
      data: [1,2,3,4,5,6,7],
      stack: 'stack1',
      backgroundColor: ['#9E9E9E'],
      // barThickness: 10
    },
  ],
};
type GoalRecordChartProps = {};

const GoalRecordChart: React.FC<GoalRecordChartProps> = () => {
  return (
    <Body>
      <Bar options={options} data={data} width={730} height={280}/>
    </Body>
  );
};

const Body = styled.div`
  padding: 20px;
  width: 766px;
  height: 299px;
  border-radius: 20px;
  background: var(--bw-whtie);
  box-shadow: 2px 4px 9px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default GoalRecordChart;
