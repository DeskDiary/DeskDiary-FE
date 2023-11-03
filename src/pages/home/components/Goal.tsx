import OutlinedFlagSharpIcon from '@mui/icons-material/OutlinedFlagSharp';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { todayLerningHistoryHome } from '../../../axios/historyApi';

type GoalProps = {};

const Goal: React.FC<GoalProps> = () => {
  const [todayLerningTime, setTodayLerningTime] = useState<number[]>([
    0, 0, 0, 0, 100, 0,
  ]);
  const [goalPercent, setGoalPercent] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await todayLerningHistoryHome();
        const newTodayLerningTime = result;

        if (newTodayLerningTime[5] === 0 && newTodayLerningTime[4] === 0) {
          setGoalPercent(0);
        } else {
          setGoalPercent(
            (newTodayLerningTime[5] / newTodayLerningTime[4]) * 100,
          );
        }

        // todayLerningTime 업데이트
        setTodayLerningTime(newTodayLerningTime);
      } catch (error) {
        console.error('데이터를 불러오는 중에 오류가 발생했습니다.', error);
      }
    };

    fetchData();
    setGoalPercent((todayLerningTime[5] / todayLerningTime[4]) * 100);
  }, []);

  return (
    <>
      <Container>
        <GoalDiv>
          <Title>오늘의 책상 목표</Title>
          <Content>
            <p>{`${todayLerningTime[2]}시간 ${todayLerningTime[3]}분`}</p>
            <p>목표 {`${todayLerningTime[0]}시간 ${todayLerningTime[1]}분`}</p>
          </Content>
        </GoalDiv>
        <GoalGraph>
          <CurrentGraph width={Math.min(goalPercent, 100)}></CurrentGraph>
          <OutlinedFlagSharpIcon
            style={{
              fontSize: '35px',
              color: '#337CCF',
              position: 'absolute',
              marginLeft: '523px',
              marginTop: '-48px',
              transform: 'scaleX(-1)',
            }}
          />
        </GoalGraph>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 15px;
  background-color: white;

  @media (max-width: 1400px) {
    width: 1000px;
  }

  @media (max-width: 1200px) {
    width: 800px;
  }
`;

const GoalDiv = styled.div`
  width: 553px;
  height: 117px;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.25px;
  margin-bottom: 40px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  p:first-child {
    font-size: 40px;
    font-weight: 700;
    color: var(--primary-01);
  }
  p:last-child {
    font-size: 24px;
    color: var(--gray-07);
  }
`;

const GoalGraph = styled.div`
  width: 100%;
  border-radius: 5px;
  background: var(--gray-04, #e0e0e0);
  height: 18px;
`;

const CurrentGraph = styled.div<{ width: number }>`
  width: ${props => `${props.width}%`};
  border-radius: 5px;
  background: var(--primary-00, #1a81e8);
  height: 18px;
  position: relative;
`;

export default Goal;
