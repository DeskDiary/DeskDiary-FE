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
      <Video>
        <AgoraVideoPlayer
          style={{ height: '360px', width: '600px' }}
          className="video"
          videoTrack={tracks[1]}
        />
      </Video>

      {users.length > 0 &&
        users.map(user => {
          if (user.videoTrack) {
            return (
              <Video>
                <AgoraVideoPlayer
                  style={{
                    height: '360px',
                    width: '600px',
                    display: 'inline',
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

const Video = styled.div`
  width: 400px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  background-color: beige;
  margin: 10px;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 20px;
  align-items: center;
  justify-content: center;

  overflow: scroll;
  overflow-y: hidden;
  align-items: center;

  @media (max-width: 1700px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export default Videos;
