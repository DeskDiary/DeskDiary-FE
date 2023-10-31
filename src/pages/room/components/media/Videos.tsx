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
};

const Videos: React.FC<VideosProps> = ({ users, tracks }) => {
  return (
    <Container>
      <AgoraVideoPlayer
        style={{ height: '360px', width: '600px', margin: '10px' }}
        className="video"
        videoTrack={tracks[1]}
      />

      {users.length > 0 &&
        users.map(user => {
          if (user.videoTrack) {
            return (
              <AgoraVideoPlayer
                style={{
                  height: '360px',
                  width: '600px',
                  margin: '10px',
                  display: 'inline',
                }}
                className="video"
                videoTrack={user.videoTrack}
                key={user.uid}
              />
            );
          } else return <DefaultScreen key={user.uid} />;
        })}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  /* display: flex; */
  /* flex-direction: row; */
  flex-wrap: nowrap;
  gap: 20px;

  width: 100%;
  height: 100%;
  align-items: center;

  @media (max-width: 1800px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export default Videos;
