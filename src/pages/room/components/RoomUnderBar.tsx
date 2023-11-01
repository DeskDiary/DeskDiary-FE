import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { build, help_outline, logout } from '../../../images/room';
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
          <img src={logout} alt="방나가기" />
          <p>방 나가기</p>
        </OutRoomButton>
        <SettingList>
          <img src={build} alt="" />
          <p>환경설정</p>
          <img src={help_outline} alt="" />
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
  /* border: 1px solid var(--primary-01); */
  background-color: white;
  border-radius: 24px;
  img {
    width: 24px;
    height: 24px;
  }
  p {
    color: var(--primary-01);
    font-weight: 600;
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
