import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import volumOffImg from '../../../images/volume_off.png';
import volumOnImg from '../../../images/volume_up.png';
type VideoPlayerProps = {
  user: any;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ user }) => {
  const ref = useRef<any>();

  const [sound, setSound] = useState<boolean>(true);

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);
  return (
    <Body>
      <CamDivBox ref={ref}>
        <UserInfoDivBox>
          <p>닉네임닉네임닉네임닉네임</p>
          <img src={sound ? volumOnImg : volumOffImg} alt="" />
        </UserInfoDivBox>
      </CamDivBox>
    </Body>
  );
};

const Body = styled.div`
  border-radius: 8px;
  width: 40%;
  min-width: 300px;
`

const CamDivBox = styled.div`
  display: flex;
  width: 100%;
  aspect-ratio: 3/2;
  background: rgba(217, 217, 217, 1);
  border-radius: 8px;
  position: relative;
  margin: 10px;
  overflow: hidden;
`;



const UserInfoDivBox = styled.div`
  width: 90%;
  display: flex;
  position: absolute;
  z-index: 10;
  bottom: 0;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 5%;
  margin-right: 5%;
  p {
    width: 30%;
    padding: 10px;
    margin-right: auto;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    white-space: nowrap; /* 줄 바꿈 방지 */
    overflow: hidden; /* 내용 숨김 */
    text-overflow: ellipsis; /* 글자를 ...으로 표시 */
  }
  img {
    width: 24px;
    height: 24px;
    padding: 10px;
    border-radius: 50%;
    margin-left: auto;
  }
`;
export default VideoPlayer;
