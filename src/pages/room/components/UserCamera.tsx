import AgoraRTC from 'agora-rtc-sdk-ng';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getCookie } from '../../../auth/cookie';
import VideoPlayer from './VideoPlayer';

type CameraProps = {
  // roomInfo: {
  //   agoraAppId: string;
  //   agoraToken: string;
  //   category: string;
  //   count: number;
  //   createdAt: string;
  //   maxHeadcount: number;
  //   note: string;
  //   nowHeadcount: number;
  //   ownerId: number;
  //   uuid: string;
  //   roomThumbnail: string | null;
  //   title: string;
  //   updatedAt: string;
  //   roomId: number;
  // };
};

const UserCamera: React.FC<CameraProps> = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [client, setClient] = useState<any>(null);
  const [roomInfo, setRoomInfo] = useState({
    agoraAppId: '',
    agoraToken: '',
    category: '',
    count: 0,
    createdAt: '0',
    maxHeadcount: 0,
    note: '0',
    nowHeadcount: 0,
    ownerId: 0,
    roomId: 0,
    roomThumbnail: '0',
    title: '0',
    updatedAt: '0',
    uuid: '0',
  });
  // console.log('룸데이터', roomInfo)
  const [users, setUsers] = useState<{ uid: any; videoTrack: any }[]>([]);
  const [localTracks, setLocalTracks] = useState<any[]>([]);
  const location = useLocation();
  const getUUID = location.pathname.split('/room/')[1];
  const token = getCookie('token');
  const getRoomInfo = async () => {
    try {
      const response = await axios.get(`${serverUrl}/room/${getUUID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allData = response.data;
      console.log('전체 방 데이터', allData)
      const data = response.data.findRoom;
      console.log('리스폰스', data);
      setRoomInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRoomInfo();
  }, []);

  useEffect(() => {
    if (roomInfo.agoraAppId !== '' && roomInfo.agoraToken && roomInfo.title) {
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

  console.log('클라이언트', client);

  const handleUserJoined = async (user: any, mediaType: any) => {
    await client.subscribe(user, mediaType);

    if (mediaType === 'video') {
      console.log('mediaType', mediaType);
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
