import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { RoomAtom } from '../../../recoil/RoomAtom';
import UserCamera from './UserCamera';
type Props = {};


const RoomCamArea = (props: Props) => {
  const [roomInfo, setRoomInfo] = useRecoilState(RoomAtom);
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
