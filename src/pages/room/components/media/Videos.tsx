import React from 'react';
import {
  IAgoraRTCRemoteUser,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  AgoraVideoPlayer,
} from 'agora-rtc-react';
import DefaultScreen from './DefaultScreen';
import styled from 'styled-components';

type VideosProps = {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  volumes: any;
};

const Videos: React.FC<VideosProps> = ({ users, tracks, volumes }) => {
  // 볼륨 레벨에 따라서 색상을 결정하는 함수
  const getBorderColorByVolume = (volume: number) => {
    // if (volume > 70) return 'red';
    // if (volume > 50) return 'orange'; // 볼륨이 5 이상이면 빨간색
    if (volume > 18) return 'green'; // 볼륨이 3 이상이면 주황색
    return 'var(--gray-09)'; // 그 외는 녹색
  };

  // 본인의 오디오 트랙 ID를 가져옴
  const myAudioTrackId = tracks[0].getTrackId();
  

  return (
    <Container>
      <Video border={getBorderColorByVolume(volumes[myAudioTrackId] || 0)}>
        <AgoraVideoPlayer
          style={{ height: '360px', width: '600px', backgroundColor: 'black' }}
          className="video"
          videoTrack={tracks[1]}
        />
      </Video>

      {users.length > 0 &&
        users.map(user => {
          if (user.videoTrack) {
            const volumeLevel = volumes[user.uid] || 0; // 기본 볼륨 값은 0으로 설정
            const borderColor = getBorderColorByVolume(volumeLevel);
            return (
              <Video key={user.uid} border={borderColor}>
                <AgoraVideoPlayer
                  style={{
                    height: '300px',
                    width: '400px',
                    display: 'inline',
                    backgroundColor: 'black',
                  }}
                  className="video"
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              </Video>
            );
          } else return <DefaultScreen key={user.uid} />;
        })}
    </Container>
  );
};

const Video = styled.div<{ border: string }>`
  width: 400px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  border: 3px solid ${({ border }) => border};
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;

  overflow: scroll;
  overflow-y: hidden;
  align-items: center;
  margin-bottom: 100px;
  @media (max-width: 1700px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 1500px) {
    grid-template-columns: repeat(1, 1fr);
    margin-bottom: 0px;
  }
`;
export default Videos;
