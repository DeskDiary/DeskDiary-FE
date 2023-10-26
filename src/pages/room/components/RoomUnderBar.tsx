import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import 환경설정 from '../../../images/room/build.svg';
import 도움말 from '../../../images/room/help_outline.svg';
import 방나가기 from '../../../images/room/logout.svg';
import { RoomModalAtom } from '../../../recoil/RoomAtom';
import RoomModal from './RoomModal';
import io from 'socket.io-client';

type RoomUnderBarProps = { roomId: string };

const RoomUnderBar: React.FC<RoomUnderBarProps> = ({ roomId }) => {
  const socket = io(`${process.env.REACT_APP_SERVER_URL!}`);

  const [outModalState, setOutModalState] =
    useRecoilState<boolean>(RoomModalAtom);

  const roomOutButtonHandler = () => {
    // 에러 메시지 리스너 추가
    // const errorHandler = (message: string) => {
    //   console.error(message);
    //   console.log('🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈', message);
    // };

    // socket.on('error-room', errorHandler);

    // return () => {
    //   socket.off('error-room'); // 컴포넌트 unmount 시 리스너 해제
    // };

    socket.emit(
      'leave-room',
      {
        uuid: roomId,
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

    setOutModalState(true);
  };

  // // 이 부분을 추가해줘!
  // useEffect(() => {
  //   socket.on('error-room', (message: string) => {
  //     console.error(message);
  //     // 원한다면 여기에 추가적인 로직 (예: 알림, 모달 등) 추가 가능
  //   });

  //   return () => {
  //     socket.off('error-room'); // 컴포넌트 unmount 시 리스너 해제
  //   };
  // }, [socket]);

  return (
    <>
      {outModalState && <RoomModal />}

      <Body>
        <OutRoomButton onClick={roomOutButtonHandler}>
          <img src={방나가기} alt="방나가기" />
          <p>방 나가기</p>
        </OutRoomButton>
        <SettingList>
          <img src={환경설정} alt="" />
          <p>환경설정</p>
          <img src={도움말} alt="" />
          <p>도움말</p>
        </SettingList>
      </Body>
    </>
  );
};

const Body = styled.div`
  width: 100vw;
  height: 60px;
  background-color: var(--gray-09);
  display: flex;
  align-items: center;
`;

const OutRoomButton = styled.button`
  background-color: var(--gray-09);
  display: flex;
  width: 180px;
  height: 48px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-left: 20px;
  border: 1px solid var(--primary-01);

  img {
    width: 24px;
    height: 24px;
  }
  p {
    color: var(--primary-01);
  }
`;

const SettingList = styled.div`
  margin-left: 50px;
  display: flex;
  gap: 16px;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
  }
  p {
    color: white;
    font-size: 12px;
  }
`;

export default RoomUnderBar;
