import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import history from '../../history';
import { RoomUUIDAtom } from '../../recoil/RoomAtom';
import AsmrPlayer from './components/AsmrPlayer';
import RoomCamArea from './components/RoomCamArea';
import RoomHeader from './components/RoomHeader';
import RoomSideBar from './components/RoomSideBar';
import RoomUnderBar from './components/RoomUnderBar';
import ChatBox from './components/chat/ChatBox';

type RoomProps = {
  children?: React.ReactNode;
};

const Room: React.FC<RoomProps> = () => {
  const [joinUUID, setJoinUUID] = useRecoilState<string>(RoomUUIDAtom);

  const location = useLocation();
  useEffect(() => {
    setJoinUUID(location.pathname.split('/')[2]);
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    const listenBackEvent = () => {
      alert(`뒤로가기이벤트를 감지했똬${'\n'}방 나가기 버튼으로 나가롸
      `);
      navigate(`/room/${joinUUID}`);
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
              <ChatBox />
            </ChattingAreaDiv>
          </Area>
        </Content>
      </Container>
      <RoomUnderBar />
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
`;

export default Room;
