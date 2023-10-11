import styled from '@emotion/styled';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
type Props = {};

const RoomCamArea = (props: Props) => {
  const cameraList = [
    { id: 1, nickname: '나는야성호' },
    { id: 2, nickname: '심심해요' },
    { id: 3, nickname: '바나나마스터' },
    { id: 4, nickname: '닉네임' },

  ];

  return (
    <Cameras>
      {cameraList.map(item => {
        return (
          <Camera key={item.id}>
            <CameraIcon>
              <CameraAltOutlinedIcon style={{ fontSize: '50px' }} />
            </CameraIcon>

            <CameraUserInfo>
              <CameraUserName>{item.nickname}</CameraUserName>
              <CameraUserImg>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Font_Awesome_5_brands_github.svg/1200px-Font_Awesome_5_brands_github.svg.png"
                  alt=""
                />
              </CameraUserImg>
            </CameraUserInfo>
          </Camera>
        );
      })}
    </Cameras>
  );
};

const Cameras = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
`;

const Camera = styled.div`
  width: 263px;
  height: 213px;
  background: rgba(217, 217, 217, 1);
  padding: 10px;
  position: relative; /* 부모 요소를 기준으로 위치 지정 */
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
