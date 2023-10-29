import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getCookie } from '../../auth/cookie';
import history from '../../history';
import { RoomAtom, RoomUUIDAtom } from '../../recoil/RoomAtom';
import AsmrPlayer from './components/AsmrPlayer';
import RoomCamArea from './components/RoomCamArea';
import RoomHeader from './components/RoomHeader';
import RoomSideBar from './components/RoomSideBar';
import RoomUnderBar from './components/RoomUnderBar';
import ChatBox from './components/chat/ChatBox';
import SetMediaModal from './components/SetMediaModal';

type RoomProps = {
  children?: React.ReactNode;
};

const Room: React.FC<RoomProps> = () => {
  const [roomInfo, setRoomInfo] = useRecoilState(RoomAtom);
  const [roomUUID, setRoomUUID] = useRecoilState(RoomUUIDAtom);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const location = useLocation();
  const token = getCookie('token');
  useEffect(() => {
    setRoomUUID(location.pathname.split('/')[2]);
    getRoomInfo();
  }, []);
  const navigate = useNavigate();

  // const NotReload = (event:any) => {
  //     if (
  //       (event.ctrlKey === true && (event.keyCode === 78 || event.keyCode === 82)) ||
  //       event.keyCode === 116
  //     ) {
  //       event.preventDefault();
  //     }
  //   }

  //   document.addEventListener("keydown", NotReload);

  useEffect(() => {
    const listenBackEvent = () => {
      alert(`뒤로가기이벤트를 감지했똬${'\n'}방 나가기 버튼으로 나가롸
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
  }, []);

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
              <RoomCamArea />
            </CamAreaDiv>
            {/* 채팅이 들어갈 곳 */}
            <ChattingAreaDiv>
              <AsmrPlayer />
              <ChatBox
                roomId={roomInfo.uuid}
                userCount={roomInfo.maxHeadcount}
              />
            </ChattingAreaDiv>
          </Area>
        </Content>
      </Container>
      <RoomUnderBar roomId={roomInfo.uuid} />
      {isOpenModal && (
        <SetMediaModal setIsOpen={setIsOpenModal} room={roomInfo} />
      )}
    </>
  );
};

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
  margin-top: 61px;
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
