import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import 일시정지 from '../../../images/room/pause.svg';
import 타이머 from '../../../images/room/timer.svg';
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
  const [timer, setTimer] = useRecoilState<string>(timerState);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [timerButtonState, setTimerButtonState] = useState<boolean>(false);
  const timerIntervalRef = useRef<any>(null);
  const [startLocalStorageData, setStartLocalStorageData] = useState<any[]>([]);

  const [endLocalStorageData, setEndLocalStorageData] = useState<any[]>([]);
  const [누적시간State, set누적시간State] = useState(0);

  useEffect(() => {
    const existingStartTime = localStorage.getItem('startTime');
    const existingEndTime = localStorage.getItem('endTime');

    
    if (existingStartTime && existingEndTime) {
      if (
        JSON.parse(existingStartTime).length !==
        JSON.parse(existingEndTime).length
      ) {
        if (
          JSON.parse(existingStartTime).length > JSON.parse(existingEndTime).length
        ) {
          const a = JSON.parse(existingStartTime)
            .map((x: string) => {
              return x.replaceAll(/["/]/g, '');
            })
            .slice(0, -1);
          localStorage.setItem('startTime', JSON.stringify(a));
        } else if (
          JSON.parse(existingStartTime).length < JSON.parse(existingEndTime).length
        ) {
          const a = JSON.parse(existingEndTime)
            .map((x: string) => {
              return x.replaceAll(/["/]/g, '');
            })
            .slice(0, -1);
          localStorage.setItem('endTime', JSON.stringify(a));
        }
      }
    } else if (existingStartTime) {
      localStorage.removeItem('startTime');
    }
    if (existingStartTime) {
      setStartLocalStorageData(
        JSON.parse(existingStartTime).map((x: string) => {
          return x.replaceAll(/["/]/g, '');
        }),
      );
    }
    if (existingEndTime) {
      setEndLocalStorageData(
        JSON.parse(existingEndTime).map((x: string) => {
          return x.replaceAll(/["/]/g, '');
        }),
      );
    }
    let 누적시간 = 0;
      for (let i = 0; i < startLocalStorageData.length - 1; i++) {
        let 시작시간 = startLocalStorageData[i]
          .split('T')[1]
          .slice(0, 8)
          .split(':');
        let 종료시간 = endLocalStorageData[i]
          .split('T')[1]
          .slice(0, 8)
          .split(':');
        시작시간 =
          Number(시작시간[0]) * 3600 +
          Number(시작시간[1]) * 60 +
          Number(시작시간[2]);
        종료시간 =
          Number(종료시간[0]) * 3600 +
          Number(종료시간[1]) * 60 +
          Number(종료시간[2]);

        누적시간 += 종료시간 - 시작시간;
      }
      set누적시간State(누적시간);
  }, []);

  const timerButtonHandler = () => {
    setButtonDisabled(true);

    // 1초 뒤에 버튼 다시 활성화
    setTimeout(() => {
      setButtonDisabled(false);
    }, 1000);
    setTimerButtonState(!timerButtonState);
  };

  // 시작, 일시정시 기록을 로컬스토리지에 저장
  useEffect(() => {
    const existingStartTime = localStorage.getItem('startTime');
    const existingEndTime = localStorage.getItem('endTime');
    if (timerButtonState) {
      const startTime = getKoreanTime();

      if (existingStartTime) {
        let startTimeArray = JSON.parse(existingStartTime);
        startTimeArray.push(JSON.stringify(startTime));
        startTimeArray = startTimeArray.map((x: any) => {
          return x.replaceAll(/["/]/g, '');
        });
        setStartLocalStorageData(startTimeArray);
        localStorage.setItem('startTime', JSON.stringify(startTimeArray));
      } else {
        setStartLocalStorageData([JSON.stringify(startTime)]);
        localStorage.setItem('startTime', JSON.stringify([startTime]));
      }
    } else {
      if (timer !== '00:00:00' && existingStartTime !== null) {
        const endTime = getKoreanTime();

        if (existingEndTime) {
          // 이미 저장된 데이터가 있는 경우, 배열로 변환
          let endTimeArray = JSON.parse(existingEndTime);
          endTimeArray.push(JSON.stringify(endTime));
          endTimeArray = endTimeArray.map((x: any) => {
            return x.replaceAll(/["/]/g, '');
          });
          // 다시 로컬 스토리지에 배열로 저장
          setEndLocalStorageData(endTimeArray);
          localStorage.setItem('endTime', JSON.stringify(endTimeArray));
        } else {
          // 저장된 데이터가 없는 경우, 새 배열로 시작
          setEndLocalStorageData([JSON.stringify(endTime)]);
          localStorage.setItem('endTime', JSON.stringify([endTime]));
        }
      }
    }
  }, [timerButtonState]);

  useEffect(() => {
    if (startLocalStorageData.length > 1) {
      let 누적시간 = 0;
      for (let i = 0; i < startLocalStorageData.length - 1; i++) {
        let 시작시간 = startLocalStorageData[i]
          .split('T')[1]
          .slice(0, 8)
          .split(':');
        let 종료시간 = endLocalStorageData[i]
          .split('T')[1]
          .slice(0, 8)
          .split(':');
        시작시간 =
          Number(시작시간[0]) * 3600 +
          Number(시작시간[1]) * 60 +
          Number(시작시간[2]);
        종료시간 =
          Number(종료시간[0]) * 3600 +
          Number(종료시간[1]) * 60 +
          Number(종료시간[2]);

        누적시간 += 종료시간 - 시작시간;
      }
      set누적시간State(0);
      set누적시간State(누적시간);
    } else if (
      startLocalStorageData.length === 1 &&
      endLocalStorageData.length === 1
    ) {
      let 누적시간 = 0;
      let 시작시간 = startLocalStorageData[0]
        .split('T')[1]
        .slice(0, 8)
        .split(':');
      let 종료시간 = endLocalStorageData[0]
        .split('T')[1]
        .slice(0, 8)
        .split(':');
      시작시간 =
        Number(시작시간[0]) * 3600 +
        Number(시작시간[1]) * 60 +
        Number(시작시간[2]);
      종료시간 =
        Number(종료시간[0]) * 3600 +
        Number(종료시간[1]) * 60 +
        Number(종료시간[2]);

      누적시간 += 종료시간 - 시작시간;
      set누적시간State(0);
      set누적시간State(누적시간);
    }

    const updateTimer = () => {
      if (timerButtonState) {
        // 타이머시작상태
        const 마지막시간 = startLocalStorageData[
          startLocalStorageData.length - 1
        ]
          .split('T')[1]
          .slice(0, 8);
        const 현재시간 = JSON.stringify(getKoreanTime())
          .split('T')[1]
          .slice(0, 8);
        const 마지막시간초 = 마지막시간
          .split(':')
          .reduce((acc: number, currentValue: string, index: number) => {
            if (index === 0) {
              // 첫 번째 요소는 시간
              return acc + parseInt(currentValue) * 3600; // 시간을 초로 변환
            } else if (index === 1) {
              // 두 번째 요소는 분
              return acc + parseInt(currentValue) * 60; // 분을 초로 변환
            } else if (index === 2) {
              // 세 번째 요소는 초
              return acc + parseInt(currentValue); // 그대로 더합니다
            }
            return acc;
          }, 0);
        const 현재시간초 = 현재시간
          .split(':')
          .reduce((acc: number, currentValue: string, index: number) => {
            if (index === 0) {
              // 첫 번째 요소는 시간
              return acc + parseInt(currentValue) * 3600; // 시간을 초로 변환
            } else if (index === 1) {
              // 두 번째 요소는 분
              return acc + parseInt(currentValue) * 60; // 분을 초로 변환
            } else if (index === 2) {
              // 세 번째 요소는 초
              return acc + parseInt(currentValue); // 그대로 더합니다
            }
            return acc;
          }, 0);
        const 누적시간 = 현재시간초 - 마지막시간초 + 누적시간State;
        setTimer(formatTime(누적시간));
      } else {
        // 일시정지상태
      }
    };
    // 1초마다 updateTimer 함수 실행
    if (timerButtonState) {
      timerIntervalRef.current = setInterval(updateTimer, 500);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }
  }, [startLocalStorageData, endLocalStorageData]);

  return (
    <Container>
      <p>{timer}</p>
      <StartButton
        timerButtonState={timerButtonState}
        disabled={buttonDisabled}
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
