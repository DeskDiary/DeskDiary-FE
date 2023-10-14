import styled from '@emotion/styled';
import RoomCamArea from '../components/room/RoomCamArea';
import RoomHeader from '../components/room/RoomHeader';
import RoomSideBar from '../components/room/RoomSideBar';

type RoomProps = {
  children?: React.ReactNode;
};

const Room: React.FC<RoomProps> = () => {
  return (
    <Container>
      <RoomSideBar />
      <Content>
        <RoomHeader />
        <Area>
          {/* 캠이 들어갈 곳 */}
          <CamAreaDiv>
            <RoomCamArea />
          </CamAreaDiv>
          {/* 채팅이 들어갈 곳 */}
          <ChattingAreaDiv>채팅이 들어갈 곳</ChattingAreaDiv>
        </Area>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
`;

const Area = styled.div`
  display: flex;
  height: calc(100vh - 96px);
  /* background-color: aqua; */
`;

const CamAreaDiv = styled.div`
  width: 70%;
  padding-top: 61px;
  margin-left: 40px;
  background-color: beige;
`;

const ChattingAreaDiv = styled.div`
  width: 30%;
  /* background-color: beige; */
`;

export default Room;