import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { pause, timerImg } from '../../../images/room';
import { timerState } from '../../../recoil/TimeAtom';
type TimerProps = {};

export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime =
    String(hours).padStart(2, '0') +
    ':' +
    String(minutes).padStart(2, '0') +
    ':' +
    String(remainingSeconds).padStart(2, '0');

  return formattedTime;
}
export const getKoreanTime = () => {
  const now = new Date();
  // 한국 시간대로 변환
  now.setHours(now.getHours() + 9);
  return now;
};

const Timer: React.FC<TimerProps> = () => {
  
  const [timerButtonState, setTimerButtonState] = useState<boolean>(false);

  return (
    <Container>
      <p>{`00:00:00`}</p>
      <StartButton
        timerbuttonstate={`${timerButtonState}`}
      >
        <img src={timerButtonState ? pause : timerImg} alt="" />
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

const StartButton = styled.button<{ timerbuttonstate: string }>`
  width: 180px;
  height: 48px;
  border: none;
  display: flex;
  padding: 10px 5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: ${props =>
    props.timerbuttonstate === 'true' ? 'none' : 'var(--primary-01)'};
  p {
    color: var(--gray-01);
    font-size: 16px;
  }
  border-radius: 24px;
`;
export default Timer;
