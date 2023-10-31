import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getCookie } from '../../../auth/cookie';
import {
  RoomInfo,
  RoomModalAtom,
  RoomUUIDAtom,
} from '../../../recoil/RoomAtom';
import { timerState } from '../../../recoil/TimeAtom';
import socket from '../socketInstance';
import { getKoreanTime } from './Timer';
import { CloseMediaAtom } from '../../../recoil/CamAtom';

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
  const [closeMedia, setCloseMedia] = useRecoilState<boolean>(CloseMediaAtom);

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
    setCloseMedia(true);

    // 마이크와 캠을 닫는 코드
    // if (tracks[0]) {
    //   tracks[0].close();
    // }
    // if (tracks[1]) {
    //   tracks[1].close();
    // }
  };

  return (
    <Body>
      <ModalBox>
        <p>여기에서 머무른 시간이에요</p>
        <TimeBox>
          <p>책상시간</p>
          <p>{timer}</p>
        </TimeBox>
        <CheckInBox>
          <div>
            <p>First Check In</p>
            <p>{storageStartData}</p>
          </div>
          <div>
            <p>Last Check Out</p>
            <p>{storageEndData}</p>
          </div>
        </CheckInBox>
        <p>퇴장하시겠어요?</p>
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
    </Body>
  );
};

const Body = styled.div`
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
`;

const TimeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > p:last-child {
    font-size: 24px;
    font-weight: 700;
  }
`;
const CheckInBox = styled.div`
  display: flex;
  align-items: center;
  gap: 44px;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & > div > p:first-child {
    font-size: 16px;
  }
  & > div > p:last-child {
    font-size: 18px;
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
    cursor: pointer;
  }
  button:first-child {
    background: var(--gray-07);
    color: white;
  }
  button:last-child {
    background: white;
    border: 1px solid var(--gray-07);
    color: var(--gray-07);
  }
`;

export default RoomModal;
