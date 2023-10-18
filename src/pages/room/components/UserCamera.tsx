import AgoraRTC from 'agora-rtc-sdk-ng';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import VideoPlayer from './VideoPlayer';

type CameraProps = {};

const APP_ID = 'a53d5f93a9934e0299413f35614fa485';
const TOKEN =
  '007eJxTYDj28UZh6e6g1IVsU5Zr3yy/vvHUkjbR0F9fA88ezd/+t9BegSHR1DjFNM3SONHS0tgk1cDI0tLE0DjN2NTM0CQt0cTCdEKzXmpDICPDoSWxLIwMEAjiszAU5efnMjAAADRlIfY=';
const CHANNEL = 'room';

const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

const UserCamera: React.FC<CameraProps> = () => {
  const [users, setUsers] = useState<{ uid: any; videoTrack: any }[]>([]);
  const [localTracks, setLocalTracks] = useState<any[]>([]);
  const handleUserJoined = async (user: any, mediaType: any) => {
    await client.subscribe(user, mediaType);

    if (mediaType === 'video') {
      setUsers(previousUsers => [...previousUsers, user]);
    }

    if (mediaType === 'audio') {
      // user.audioTrack.play();
    }
  };

  const handleUserLeft = (user: any) => {
    setUsers(previousUsers => previousUsers.filter(u => u.uid !== user.uid));
  };

  useEffect(() => {
    client.on('user-published', handleUserJoined);
    client.on('user-left', handleUserLeft);

    client
      .join(APP_ID, CHANNEL, TOKEN, null)
      .then(uid => {
        return Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid]);
      })
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers(previousUsers => [
          ...previousUsers,
          {
            uid,
            videoTrack,
          },
        ]);
        client.publish(tracks);
      });
    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.off('user-published', handleUserJoined);
      client.off('user-left', handleUserLeft);
      client.unpublish(localTracks).then(() => client.leave());
    };
  }, []);

  return (
    <Cameras>
      {users.map(item => {
        return <VideoPlayer key={item.uid} user={item} />;
      })}
    </Cameras>
  );
};

const Cameras = styled.div`
  display: 'flex';
  gap: 10px;
  margin: 10px;
  padding: 10px;
`;

export default UserCamera;
