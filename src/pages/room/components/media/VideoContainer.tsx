import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  IAgoraRTCRemoteUser,
  createMicrophoneAndCameraTracks,
} from 'agora-rtc-react';
import VideoController from './VideoController';
import Videos from './Videos';
import { getCookie } from '../../../../auth/cookie';
import { useClient } from './config';
import { useQuery } from 'react-query';
import { fetchUser } from '../../../../axios/api';
import { useRecoilState } from 'recoil';
import { RoomInfo } from '../../../../recoil/RoomAtom';

type VideoContainerProps = {};
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const VideoContainer: React.FC<VideoContainerProps> = ({}) => {
  const token = getCookie('token');
  const getUUID = window.location.pathname.split('/room/')[1];
  const [recoilRoomInfo, setRecoilRoomInfo] = useRecoilState(RoomInfo);
  const [roomInfo, setRoomInfo] = useState({
    agoraAppId: '',
    agoraToken: '',
    category: '',
    count: 0,
    createdAt: '',
    maxHeadcount: 0,
    note: '',
    nowHeadcount: 0,
    ownerId: 0,
    roomId: 0,
    roomThumbnail: '',
    title: '',
    updatedAt: '',
    uuid: '',
  });

  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState<boolean>(false);
  
  const APP_ID = roomInfo.agoraAppId;
  const TOKEN = roomInfo.agoraToken;
  const CHANNEL = roomInfo.uuid;

  const client = useClient();

  const { data } = useQuery('cam-user', fetchUser);

  const { ready, tracks } = useMicrophoneAndCameraTracks();

  const getRoomInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/room/${getUUID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response.data.findRoom;
      setRoomInfo(data);
      setRecoilRoomInfo(data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log('😭확인',recoilRoomInfo )
  useEffect(() => {
    getRoomInfo();
  }, []);

  useEffect(() => {
    const init = async (name: string) => {
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log('subscribe success');
        if (mediaType === 'video') {
          setUsers(prevUsers => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === 'audio') {
          user.audioTrack?.play();
        }
      });

      client.on('user-unpublished', (user, type) => {
        console.log('unpublished', user, type);
        if (type === 'audio') {
          user.audioTrack?.stop();
        }
        if (type === 'video') {
          setUsers(prevUsers => {
            return prevUsers.filter(User => User.uid !== user.uid);
          });
        }
      });

      client.on('user-left', user => {
        console.log('leaving', user);
        setUsers(prevUsers => {
          return prevUsers.filter(User => User.uid !== user.uid);
        });
      });

      await client.join(APP_ID, name, TOKEN, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      console.log('init ready');
      init(CHANNEL);
    }
  }, [CHANNEL, client, ready, tracks]);

  return (
    <div>
      {ready && tracks && (
        <VideoController
          tracks={tracks}
          setStart={setStart}
          // setInCall={setInCall}
        />
      )}
      {start && tracks && <Videos users={users} tracks={tracks} />}
    </div>
  );
};
export default VideoContainer;
