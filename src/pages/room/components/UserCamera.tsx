import AgoraRTC from 'agora-rtc-sdk-ng';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { RoomAtom } from '../../../recoil/RoomAtom';
import VideoPlayer from './VideoPlayer';

type CameraProps = {};

const UserCamera: React.FC<CameraProps> = () => {
  const [roomInfo, setRoomInfo] = useRecoilState(RoomAtom);
  const [client, setClient] = useState<any>(null);
  const [users, setUsers] = useState<{ uid: any; videoTrack: any }[]>([]);
  const [localTracks, setLocalTracks] = useState<any[]>([]);

  useEffect(() => {
    console.log(roomInfo)
    if (roomInfo.agoraAppId && roomInfo.agoraToken && roomInfo.title) {
      const APP_ID = roomInfo.agoraAppId;
      const TOKEN = roomInfo.agoraToken;
      const CHANNEL = roomInfo.uuid;
      const newClient = AgoraRTC.createClient({
        mode: 'rtc',
        codec: 'vp8',
      });

      newClient.on('user-published', handleUserJoined);
      newClient.on('user-left', handleUserLeft);
      
      newClient
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
          newClient.publish(tracks);
        });

      setClient(newClient);

      return () => {
        for (let localTrack of localTracks) {
          localTrack.stop();
          localTrack.close();
        }
        newClient.off('user-published', handleUserJoined);
        newClient.off('user-left', handleUserLeft);
        newClient.unpublish(localTracks).then(() => newClient.leave());
      };
    }
  }, [roomInfo]);

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

  return (
    <Cameras>
      {users.map(item => {
        return <VideoPlayer key={item.uid} user={item} />;
      })}
    </Cameras>
  );
};

const Cameras = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 40px;
`;

export default UserCamera;
