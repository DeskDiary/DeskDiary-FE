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
  gap: 30px;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Camera = styled.div`
  width: 45%;
  min-width: 400px;
  aspect-ratio: 16/9;
  background: rgba(217, 217, 217, 1);
  padding: 10px;
  position: relative;
`;
const CameraIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 아이콘을 가운데 정렬 */
  /* z-index: 1; 다른 내용 위에 표시하기 위해 z-index 설정 */
`;
const CameraUserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CameraUserName = styled.p`
  width: 96px;
  height: 19px;
  border-radius: 3px;
  background: rgba(160, 171, 192, 1);
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const CameraUserImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지가 div에 맞게 보이도록 설정합니다 */
  }
`;

export default RoomCamArea;
