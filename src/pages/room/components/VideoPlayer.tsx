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
    <div style={{ borderRadius: '8px' }}>
      <CamDivBox ref={ref}>
        <UserInfoDivBox>
          <p>닉네임닉네임닉네임닉네임</p>
          <img src={sound ? volumOnImg : volumOffImg} alt="" />
        </UserInfoDivBox>
      </CamDivBox>
    </div>
  );
};

const CamDivBox = styled.div`
  width: 45%;
  min-width: 400px;
  aspect-ratio: 16/9;
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
    color: #000;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 123.5%; /* 18.525px */
    letter-spacing: 0.25px;
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
