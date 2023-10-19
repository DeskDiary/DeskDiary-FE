import styled from '@emotion/styled';
import UserCamera from './UserCamera';
type Props = {};

const RoomCamArea = (props: Props) => {
  return (
    <Cameras>
      <UserCamera />
    </Cameras>
  );
};

const Cameras = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: center;
`;

export default RoomCamArea;
