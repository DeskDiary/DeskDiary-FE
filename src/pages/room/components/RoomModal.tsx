import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getCookie } from '../../../auth/cookie';
import checkin from '../../../images/room/checkin.png';
import checkout from '../../../images/room/checkout.png';
import {
  RoomInfo,
  RoomModalAtom,
  RoomUUIDAtom,
} from '../../../recoil/RoomAtom';
import { timerState } from '../../../recoil/TimeAtom';
import socket from '../socketInstance';
import { getKoreanTime } from './Timer';
type RoomModalProps = {};

const RoomModal: React.FC<RoomModalProps> = () => {
  const [roomInfo, setRoomInfo] = useRecoilState(RoomInfo);
  const [outModalState, setOutModalState] =
    useRecoilState<boolean>(RoomModalAtom);
  const navigate = useNavigate();

  const [joinUUID, setJoinUUID] = useRecoilState<string>(RoomUUIDAtom);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [storageStartData, setStorageStartData] = useState<string>('');
  const [storageEndData, setStorageEndData] = useState<string>('');
  const [timer, setTimer] = useRecoilState<string>(timerState);

  useEffect(() => {
    const storageStartData = localStorage.getItem('startTime');
    if (storageStartData) {
      setStorageStartData(
        JSON.parse(storageStartData)[0].replaceAll(/["/]/g, ''),
      );
    } else {
      setStorageStartData('기록이 없습니다.');
    }

    const storageEndData = localStorage.getItem('endTime');
    if (storageEndData) {
      setStorageEndData(
        JSON.parse(storageEndData)[
          JSON.parse(storageEndData).length - 1
        ].replaceAll(/["/]/g, ''),
      );
    } else {
      setStorageEndData('기록이 없습니다.');
    }
  }, []);

  const roomOutHandler = async () => {
    try {
      const token = getCookie('token');
      const data = {
        checkIn:
          storageStartData !== '기록이 없습니다.'
            ? storageStartData
            : JSON.stringify(getKoreanTime()).replaceAll(/["/]/g, ''),
        checkOut:
          storageEndData !== '기록이 없습니다.'
            ? storageEndData
            : JSON.stringify(getKoreanTime()).replaceAll(/["/]/g, ''),
        totalHours: timer,
        historyType: roomInfo.category, // study, hobby
      };
      console.log('❤️roomInfo.category', roomInfo);

      const response = await axios.post(
        `${serverUrl}/room/${joinUUID}/leave`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setTimer('00:00:00');
      localStorage.removeItem('startTime');
      localStorage.removeItem('endTime');
      setOutModalState(false);
      navigate('/');
      // window.location.reload()
    } catch (error) {
      console.error(error);
    }

    socket.emit(
      'leave-room',
      {
        uuid: joinUUID,
      },
      (response: any) => {
        // 서버로부터의 응답을 여기서 처리
        if (response.success) {
          console.log('방에서 나가기 성공!✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
        } else {
          console.log('방 나가기 실패😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭');
        }
      },
    );
    localStorage.removeItem('room');
  };

  const TimeFormatter = (str: any) => {
    console.log(str)
    if(str == '' || str == null || str == undefined || str == '기록이 없습니다.') {
      return `0시 0분 0초`;
    }
    const formattedStr = str.replace('T', ' ').replace('Z', '');
    const [date, time] = formattedStr.split(' ');
    const [hour, minute, second] = time.split('.')[0].split(':');
    return `${hour}시 ${minute}분 ${second}초`;
  };

  return (
    <Container>
      <ModalBox>
        <p>책상 기록 시간</p>
        <TimeBox>
          <div>
            <p
              style={{ color: '#B695EC', fontSize: '16px', fontWeight: '600' }}
            >
              CHECK IN
            </p>
            <img src={checkin} alt="checkin" />
            <p>{TimeFormatter(storageStartData)}</p>
          </div>
          <div>
            <p
              style={{ color: '#EBBD2D', fontSize: '16px', fontWeight: '600' }}
            >
              CHECK OUT
            </p>
            <img src={checkout} alt="checkout" />
            <p>{TimeFormatter(storageEndData)}</p>
          </div>
        </TimeBox>
        <TimerText>
          <span>{timer}</span>
          <span> 앉아 있었어요</span>
        </TimerText>
        <p style={{color: '#757575', fontWeight: '500'}}>퇴장하시겠어요?</p>
        <ButtonBox>
          <button onClick={roomOutHandler}>저장 후 퇴장</button>
          <button
            onClick={() => {
              setOutModalState(false);
            }}
          >
            취소
          </button>
        </ButtonBox>
      </ModalBox>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(7.5px);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  display: flex;
  width: 613px;
  height: 417px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 26px;
  flex-shrink: 0;
  border-radius: 50px;
  background: #fff;
  box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.25);
  p:first-child {
    font-size: 20px;
    font-weight: 700;
    color: var(--primary-01);
  }
`;

const TimeBox = styled.div`
  display: flex;
  gap: 24px;
  div {
    display: flex;
    gap: 7px;
    flex-direction: column;
    align-items: center;
    p:last-child {
      color: var(--primary-01);
      font-weight: 700;
      font-size: 18px;
    }
  }
`;

const TimerText = styled.div`
  display: flex;
  gap: 10px;
  span:first-child {
    color: var(--primary-01);
    font-size: 28px;
    font-weight: 700;
  }
  span:last-child {
    color: var(--gray-07);
    font-size: 16px;
    font-weight: 500;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 16px;
  button {
    width: 180px;
    padding: 10px;
    border: none;
    font-size: 24px;
    font-weight: 700;
    border-radius: 100px;
    cursor: pointer;
  }
  button:first-child {
    background: var(--primary-01);
    color: white;
  }
  button:last-child {
    background: white;
    border: 1px solid var(--primary-01);
    color: var(--primary-01);
  }
`;

export default RoomModal;
