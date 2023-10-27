import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import 환경설정 from '../../../images/room/build.svg';
import 도움말 from '../../../images/room/help_outline.svg';
import 방나가기 from '../../../images/room/logout.svg';
import { RoomModalAtom } from '../../../recoil/RoomAtom';
import RoomModal from './RoomModal';

type RoomUnderBarProps = { roomId: string };

const RoomUnderBar: React.FC<RoomUnderBarProps> = ({ roomId }) => {

  const [outModalState, setOutModalState] =
    useRecoilState<boolean>(RoomModalAtom);

  const roomOutButtonHandler = () => {
    // 에러 메시지 리스너 추가
    // const errorHandler = (message: string) => {
    //   console.error(message);
    //   console.log('🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈', message);
    // };

    setOutModalState(true);
  };

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
  width: 100%;
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
