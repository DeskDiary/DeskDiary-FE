import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { build, help_outline, logout } from '../../../images/room';
import { RoomModalAtom } from '../../../recoil/RoomAtom';
import RoomModal from './RoomModal';
import BasicPrecautions from '../../home/components/BasicPrecautions';

type RoomUnderBarProps = { roomId: string; note: string };

const RoomUnderBar: React.FC<RoomUnderBarProps> = ({ roomId, note }) => {
  const [showNote, setShowNote] = useState(false);
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

  const showNoteHandler = () => {
    setShowNote(!showNote);
  };

  const renderNoteWithBreaks = (text: string) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <>
      {outModalState && <RoomModal />}

      <Body>
        <OutRoomButton onClick={roomOutButtonHandler}>
          <img src={logout} alt="방나가기" />
          <p>방 나가기</p>
        </OutRoomButton>
        <SettingList onClick={showNoteHandler}>
          {/* <img src={build} alt="" />
          <p>환경설정</p> */}
          <img src={help_outline} alt="" />
          <p>유의사항</p>
          {showNote && (
            <Note>
              <span>📢 유의사항  　</span>
              <BasicPrecautions />
              {renderNoteWithBreaks(note)}
            </Note>
          )}
        </SettingList>
      </Body>
    </>
  );
};

const Note = styled.div`
  background-color: var(--gray-03);
  border-radius: 10px;
  opacity: 0.8;
  position: fixed;
  bottom: 70px;
  left: 30px;
  padding: 10px;
  font-size: 15px;
  color: var(--gray-07);
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 500px;
  text-align: left;
  z-index: 5000;

  > span {
    margin: 10px auto;
    color:  var(--gray-09);
    font-size: 15px;
    font-weight: 700;
  }
`;

const Body = styled.div`
  width: 100%;
  height: 60px;
  background-color: var(--gray-09);
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    width: 100vw;
  }
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
  gap: 5px;
  align-items: center;
  position: relative;
  cursor: pointer;
  
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
