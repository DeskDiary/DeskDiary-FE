import axios from 'axios';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { getCookie } from '../../../auth/cookie';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type GoalRecordChartProps = {
  view7: boolean;
  view30: boolean;
};

const GoalRecordChart: React.FC<GoalRecordChartProps> = ({ view7, view30 }) => {
  const generateDateArray = (startDate: any, endDate: any) => {
    const dateArray = [];
    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      const dayOfWeek = date.toLocaleDateString('ko-KR', { weekday: 'short' });
      dateArray.push({ date: formattedDate, dayOfWeek: dayOfWeek });
    }
    return dateArray;
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  const sevenDaysAgo = new Date(year, month, day - 6);
  const dateArray7 = generateDateArray(sevenDaysAgo, today);
  console.log('dataArray7', dateArray7);

  const thirtyDaysAgo = new Date(year, month, day - 29);
  const dateArray30 = generateDateArray(thirtyDaysAgo, today);
  console.log('dataArray30', dateArray30);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const token = getCookie('token');
  const [weeklyHobby, setWeeklyHobby] = useState<any[]>([]);
  const [weeklyStudy, setWeeklyStudy] = useState<any[]>([]);
  console.log('7일 데이터', weeklyHobby, weeklyStudy);
  const [monthlyHobby, setMonthlyHobby] = useState<any[]>([]);
  const [monthlyStudy, setMonthlyStudy] = useState<any[]>([]);

  // const [view7, setView7] = useState<boolean>(true);
  // const [view30, setView30] = useState<boolean>(false);

  // const view7OnclickHandler = () => {
  //   setView7(true);
  //   setView30(false);
  // };
  // const view30OnclickHandler = () => {
  //   setView7(false);
  //   setView30(true);
  // };

  const sevenData = async () => {
    try {
      const response = await axios.get(`${serverUrl}/learning-history/weekly`, {
        headers: {
          Authorization: `Bearer ${token}`, // JWT 토큰을 여기에 삽입해주세요
        },
      });
      const data = response.data;

      setWeeklyStudy(
        data.weeklyStudy.map((x: any) => {
          const date = new Date(x.checkOut);

          const dayOfWeek = date.getDay();
          const days = ['일', '월', '화', '수', '목', '금', '토'];
          const dayName = days[dayOfWeek];

          return { ...x, dayName: dayName };
        }),
      );
      setWeeklyHobby(
        data.weeklyHobby.map((x: any) => {
          const date = new Date(x.checkOut);

          const dayOfWeek = date.getDay();
          const days = ['일', '월', '화', '수', '목', '금', '토'];
          const dayName = days[dayOfWeek];

          return { ...x, dayName: dayName };
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const monthData = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/learning-history/monthly`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response.data;
      console.log('한달 데이터', data);
      setMonthlyHobby(data.monthlyHobby);
      setMonthlyStudy(data.monthlyStudy);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    sevenData();
    monthData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: '목표 달성 기록 모음',
      },
    },
  };

  const weeklyData = {
    labels: dateArray7.map(x => x.dayOfWeek),
    datasets: [
      {
        label: '취미',
        data: weeklyHobby.map(x => x.totalHours),
        stack: 'stack1',
        backgroundColor: ['#757575'],
      },
      {
        label: '스터디',
        data: weeklyStudy.map(x => x.totalHours),
        stack: 'stack1',
        backgroundColor: ['#9E9E9E'],
      },
    ],
  };

  const monthlyData = {
    labels: dateArray30.map(x => x.date.slice(5)),
    datasets: [
      {
        label: '취미',
        data: monthlyHobby.map(x => x.totalHours),
        stack: 'stack1',
        backgroundColor: ['#757575'],
      },
      {
        label: '스터디',
        data: monthlyStudy.map(x => x.totalHours),
        stack: 'stack1',
        backgroundColor: ['#9E9E9E'],
      },
    ],
  };

  return (
    <Body>
      {view7 && (
        <Bar options={options} data={weeklyData} width={730} height={240} />
      )}
      {view30 && (
        <Bar options={options} data={monthlyData} width={730} height={240} />

      )}
    </Body>
  );
};

const Body = styled.div``;

export default GoalRecordChart;
