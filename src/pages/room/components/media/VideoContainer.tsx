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
import styled from 'styled-components';

type VideoContainerProps = {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
};
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const VideoContainer: React.FC<VideoContainerProps> = ({ setInCall }) => {
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
      // console.error(error);
    }
  };
  // console.log('😭확인', recoilRoomInfo);
  useEffect(() => {
    getRoomInfo();
  }, []);

  const handleUserLeft = async (currentTracks: any) => {
    // console.log('✨아고라 연결 끊기');

    if (currentTracks) {
      for (const track of currentTracks) {
        if (track) {
          try {
            await track.stop();
            await track.close();
            // console.log(`✨Track 멈춤`);
          } catch (error) {
            // console.error('Error stopping or closing track:', error);
          }
        }
      }
    }

    if (client && currentTracks) {
      await client.unpublish(currentTracks);
      // console.log('✨unpublish 완료');
    }

    await client.leave();
    // console.log('✨✨✨✨✨');
  };

  useEffect(() => {
    const init = async (name: string) => {
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        // console.log('subscribe success');
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
        // console.log('unpublished', user, type);
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
        // console.log('leaving', user);
        setUsers(prevUsers => {
          return prevUsers.filter(User => User.uid !== user.uid);
        });
      });

      await client.join(APP_ID, name, TOKEN, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };
    const currentTracks = tracks;

    if (ready && tracks) {
      // console.log('init ready');
      init(CHANNEL);
    }

    return () => {
      // 아고라 연결 끊기 로직
      // console.log('===Tracks:', tracks);
      // console.log('===Current Tracks:', currentTracks);

      handleUserLeft(tracks);
    };
  }, [CHANNEL, client, ready, tracks]);

  return (
    <Container>
      <Controller>
      {ready && tracks && (
        <VideoController
          tracks={tracks}
          setStart={setStart}
          setInCall={setInCall}
        />
      )}
      </Controller>
      
      {start && tracks && <Videos users={users} tracks={tracks} />}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`

const Controller = styled.div`
  position: absolute;
  top: 260px;
  left: 10px;
  z-index: 10;
`
export default VideoContainer;
