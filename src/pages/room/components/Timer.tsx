import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 일시정지 from '../../../images/room/pause.svg';
import 타이머 from '../../../images/room/timer.svg';
type TimerProps = {};

const Timer: React.FC<TimerProps> = () => {
  const [timer, setTimer] = useState<string>('00:00:00');

  const [timerButtonState, setTimerButtonState] = useState<boolean>(false);

  const [startLocalStorageData, setStartLocalStorageData] = useState<any[]>([]);
  const [endLocalStorageData, setEndLocalStorageData] = useState<any[]>([]);

  const timerButtonHandler = () => {
    setTimerButtonState(!timerButtonState);
  };

  useEffect(() => {
    if (timerButtonState) {
      console.log('시작');
      const startTime = new Date();
      const existingStartTime = localStorage.getItem('startTime');

      if (existingStartTime) {
        // 이미 저장된 데이터가 있는 경우, 배열로 변환
        const startTimeArray = JSON.parse(existingStartTime);
        startTimeArray.push(startTime);
        // 다시 로컬 스토리지에 배열로 저장
        setEndLocalStorageData(startTimeArray);
        localStorage.setItem('startTime', JSON.stringify(startTimeArray));
      } else {
        // 저장된 데이터가 없는 경우, 새 배열로 시작
        localStorage.setItem('startTime', JSON.stringify([startTime]));
      }
    } else {
      if (timer !== '00:00:00') {
        const endTime = new Date();
        const existingEndTime = localStorage.getItem('endTime');

        if (existingEndTime) {
          // 이미 저장된 데이터가 있는 경우, 배열로 변환
          const endTimeArray = JSON.parse(existingEndTime);
          endTimeArray.push(endTime);
          // 다시 로컬 스토리지에 배열로 저장
          setEndLocalStorageData(endTimeArray);
          localStorage.setItem('endTime', JSON.stringify(endTimeArray));
        } else {
          // 저장된 데이터가 없는 경우, 새 배열로 시작
          localStorage.setItem('endTime', JSON.stringify([endTime]));
        }
      }
    }
  }, [timerButtonState]);
  console.log(
    '로컬스토리지 데이터',
    startLocalStorageData,
    endLocalStorageData,
  );
  return (
    <Container>
      <p>{timer}</p>
      <StartButton
        timerButtonState={timerButtonState}
        onClick={timerButtonHandler}
      >
        <img src={timerButtonState ? 일시정지 : 타이머} alt="" />
        <p>{timerButtonState ? '일시정지' : '기록시작'}</p>
      </StartButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const StartButton = styled.button<{ timerButtonState: boolean }>`
  width: 180px;
  height: 48px;
  border: none;
  display: flex;
  padding: 10px 5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: ${props =>
    props.timerButtonState ? 'none' : 'var(--primary-01)'};
  p {
    color: var(--gray-01);
    font-size: 16px;
  }
`;
export default Timer;
