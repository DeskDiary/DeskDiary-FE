import styled from '@emotion/styled';
import AsmrPlayer from './components/AsmrPlayer';
import RoomCamArea from './components/RoomCamArea';
import RoomHeader from './components/RoomHeader';
import RoomSideBar from './components/RoomSideBar';
import RoomUnderBar from './components/RoomUnderBar';

type RoomProps = {
  children?: React.ReactNode;
};

const Room: React.FC<RoomProps> = () => {
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
            <ChattingAreaDiv><AsmrPlayer /></ChattingAreaDiv>
          </Area>
        </Content>
      </Container>
      <RoomUnderBar />
    </>
  );
};

const Container = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`;

const Content = styled.div`
  flex: 1;
`;

const Area = styled.div`
  display: flex;
  height: calc(100vh - 156px);
`;

const CamAreaDiv = styled.div`
  width: 100%;
  margin-top: 61px;
  height: calc(100vh - (217 - 61)px);
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 61px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const ChattingAreaDiv = styled.div`
  width: 30%;
`;

export default Room;
