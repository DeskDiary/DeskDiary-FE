import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getCookie } from '../../auth/cookie';
import history from '../../history';
import { RoomAtom, RoomUUIDAtom } from '../../recoil/RoomAtom';
import AsmrPlayer from './components/AsmrPlayer';
import RoomHeader from './components/RoomHeader';
import RoomSideBar from './components/RoomSideBar';
import RoomUnderBar from './components/RoomUnderBar';
import ChatBox from './components/chat/ChatBox';
import SetMediaModal from './components/SetMediaModal';
import VideoContainer from './components/media/VideoContainer';
import arrow from '../../images/red-arrow.png';

type RoomProps = {
  children?: React.ReactNode;
};

const Room: React.FC<RoomProps> = () => {
  const [roomInfo, setRoomInfo] = useRecoilState(RoomAtom);
  const [roomUUID, setRoomUUID] = useRecoilState(RoomUUIDAtom);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [isArrow, setIsArrow] = useState(false);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const location = useLocation();
  const token = getCookie('token');
  useEffect(() => {
    setRoomUUID(location.pathname.split('/')[2]);
    getRoomInfo();
  }, []);
  const navigate = useNavigate();
  const showArrow = () => {
    
    setIsArrow(true);

    setTimeout(() => {
      setIsArrow(false);
    }, 2000); // 5000 밀리초는 5초야
  };
  console.log('😢isArrow',isArrow);
  useEffect(() => {
    const listenBackEvent = () => {
      showArrow();
      alert(`왼쪽 하단의 방 나가기 버튼을 이용 해 주세요.
      `);
      navigate(`/room/${roomUUID}`);
    };

    const unlistenHistoryEvent = history.listen(({ action }) => {
      console.log(action);
      
      if (action === 'POP') {
        
        listenBackEvent();
      }
    });

    window.onbeforeunload = function () {
      return '이 페이지를 떠나시겠습니까?';
    };

    return unlistenHistoryEvent;
  }, [roomUUID]);

  const getRoomInfo = async () => {
    const url = `${serverUrl}/room/${location.pathname.split('/')[2]}`;
    console.log('url', url);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.findRoom;
      setRoomInfo({
        agoraAppId: data.agoraAppId,
        agoraToken: data.agoraToken,
        category: data.category,
        count: data.count,
        createdAt: data.createdAt,
        maxHeadcount: data.maxHeadcount,
        note: data.note,
        nowHeadcount: data.nowHeadcount,
        ownerId: data.ownerId,
        roomId: data.roomId,
        roomThumbnail: data.roomThumbnail,
        title: data.title,
        updatedAt: data.updatedAt,
        uuid: data.uuid,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsOpenModal(true);
  }, []);

  return (
    <>
      <Container>
        <RoomSideBar />
        <Content>
          <RoomHeader />
          <Area>
            <CamAreaDiv>
              {/* <RoomCamArea /> */}
              <VideoContainer setInCall={setInCall} />
            </CamAreaDiv>
            {/* 채팅이 들어갈 곳 */}
            <ChattingAreaDiv>
              <AsmrPlayer />
              <ChatBox roomId={roomInfo.uuid} />
            </ChattingAreaDiv>
          </Area>
        </Content>
      </Container>
      <RoomUnderBar roomId={roomInfo.uuid} />
      {isOpenModal && (
        <SetMediaModal setIsOpen={setIsOpenModal} room={roomInfo} />
      )}
      {isArrow && (
        <ArrowModal>
          <Background />
          <Arrow src={arrow} alt="arrow" />
        </ArrowModal>
      )}
    </>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ArrowModal = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 100;
`;

const Arrow = styled.img`
  width: 100px;
  position: fixed;
  transform: rotate(90deg);
  bottom: 50px;
  left: 50px;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  background: var(--gray-09);
`;

const Content = styled.div`
  width: 100%;
`;

const Area = styled.div`
  display: flex;
  height: calc(100vh - 156px);
`;

const CamAreaDiv = styled.div`
  width: calc(100% - 380px);
  height: calc(100vh - (217px - 61px));
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 61px;
  overflow: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const ChattingAreaDiv = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
`;

export default Room;
