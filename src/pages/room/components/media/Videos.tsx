import React from 'react';
import {
  IAgoraRTCRemoteUser,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  AgoraVideoPlayer,
} from 'agora-rtc-react';
import DefaultScreen from './DefaultScreen';

type VideosProps = {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
};

const Videos: React.FC<VideosProps> = ({ users, tracks }) => {
  return (
    <div>
      <div id="videos">
        <AgoraVideoPlayer
          style={{ height: '500px', width: '500px' }}
          className="video"
          videoTrack={tracks[1]}
        />
        {users.length > 0 &&
          users.map(user => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  style={{ height: '500px', width: '500px' }}
                  className="video"
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              );
            } else return <DefaultScreen key={user.uid} />;
          })}
      </div>
    </div>
  );
};
export default Videos;
