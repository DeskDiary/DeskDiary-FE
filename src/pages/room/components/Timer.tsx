import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { startTimeState, timerState } from '../../../recoil/TimeAtom';

type TimerProps = {};

const Timer: React.FC<TimerProps> = () => {
  const [timer, setTimer] = useRecoilState<string>(timerState);
  const [startTime, setStartTime] = useRecoilState<string>(startTimeState);
  const [timeStop, setTimeStop] = useState<boolean>(false);
  const [roomOut, setRoomOut] = useState<boolean>(false);

  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null,
  );
  // 타이머를 멈추는 함수
  const stopTimer = () => {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const timerOnClickHandler = () => {
    if (timer === '00:00:00') {
      let time: string | Date = new Date();
      console.log(time);
      time = time.toString().split(' ')[4];
      setStartTime(time);
      const timeArr: number[] = time.split(':').map(Number);
      startTimer({
        startHour: timeArr[0],
        startMinute: timeArr[1],
        startSecond: timeArr[2],
      });
    }
  };

  const timerStopOnclickHandler = () => {
    stopTimer();
    setTimeStop(true);
  };

  const startTimer = ({
    startHour,
    startMinute,
    startSecond,
  }: {
    startHour: number;
    startMinute: number;
    startSecond: number;
  }): void => {
    // 이미 실행 중인 타이머가 있을 경우 멈추기
    stopTimer();
    const intervalId = setInterval(() => {
      const currentTime = new Date().toString().split(' ')[4];
      const time = currentTime.split(':').map(Number);
      let hour: number = time[0] - startHour;
      let minute: number = time[1] - startMinute;
      let second: number = time[2] - startSecond;

      if (second < 0) {
        second += 60;
        minute -= 1;
      }

      if (minute < 0) {
        minute += 60;
        hour -= 1;
      }

      setTimer(
        `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}:${second.toString().padStart(2, '0')}`,
      );
    }, 1000);
    setTimerInterval(intervalId);
  };

  const timeRestart = () => {
    setTimerInterval(null);
    setTimeStop(false);
  };

  const roomOutOnclickHandler = () => {
    stopTimer();
    setRoomOut(true);
  };

  // 컴포넌트가 언마운트될 때 타이머를 멈추는 useEffect
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div>
      <Time>
        <TimeButtonDiv>
          <p>Time</p>
          {timer !== '00:00:00' && (
            <button onClick={timerStopOnclickHandler}>STOP</button>
          )}
        </TimeButtonDiv>

        <p onClick={timerOnClickHandler}>
          {timer === '00:00:00' ? 'START' : timer}
        </p>
      </Time>
      <RoomOut onClick={roomOutOnclickHandler}>
        <p>방나가기</p>
        <p>check-out</p>
      </RoomOut>
      {(timeStop || roomOut) && (
        <ModalBg>
          {/* 시간 중지 모달창 */}
          {timeStop && (
            <TimeStopModal>
              <p>체크시간 중지 상태입니다.</p>
              <p>복귀 하시겠습니까?</p>
              <button onClick={timeRestart}>다시 시작</button>
            </TimeStopModal>
          )}
          {/* 방 나가기 모달창 */}
          {roomOut && (
            <RoomOutModal>
              <p>방 나가기</p>
              <p>총 누적시간 {timer}</p>
              <p>목표시간 88:88:88 남음</p>
              <button>나가기</button>
              <button
                onClick={() => {
                  setRoomOut(false);
                }}
              >
                취소
              </button>
            </RoomOutModal>
          )}
        </ModalBg>
      )}
    </div>
  );
};

const Time = styled.div`
  width: 309px;
  height: 96px;
  left: 988px;
  display: flex;
  font-family: Inter;
  font-size: 36px;
  font-weight: 700;
  line-height: 54px;
  letter-spacing: -0.01em;
  text-align: left;
  gap: 20px;
  align-items: center;
`;

const TimeButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoomOut = styled.div`
  width: 143px;
  height: 96px;
  left: 1297px;
  background: rgba(147, 147, 147, 1);
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const ModalBg = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
`;

const TimeStopModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: (618 - 60) px;
  height: (307 - 60) px;
  z-index: 2;
  font-family: Inter;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.01em;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 30px;
  button {
    width: 452px;
    height: 96px;
    font-weight: 700;
    font-size: 36px;
  }
`;

const RoomOutModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 558px;
  height: 336px;
  z-index: 2;
  font-family: Inter;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.01em;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px;

  p:nth-child(3) {
    /* 마지막 <p> 태그에 적용할 스타일 설정 */
    font-weight: 600; /* 글자 두껍게 설정 */
    font-size: 24px;
  }

  button {
    width: 452px;
    height: 73px;
    font-weight: 700;
    font-size: 36px;
  }
`;
export default Timer;
