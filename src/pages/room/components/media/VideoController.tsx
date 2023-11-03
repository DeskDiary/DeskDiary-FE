import React, { useEffect, useState } from 'react';
import { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import { useClient } from './config';
import {
  FaVolumeMute,
  FaVolumeUp,
  FaVideo,
  FaVideoSlash,
} from 'react-icons/fa';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchUser } from '../../../../axios/api';

type VideoControllerProps = {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoController: React.FC<VideoControllerProps> = ({
  tracks,
  setStart,
  setInCall,
}) => {
  const client = useClient();
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type: 'audio' | 'video') => {
    // 컴, 오디어 끄기
    if (type === 'audio') {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState(ps => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === 'video') {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState(ps => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  const { data, isLoading, isError } = useQuery('cam-user', fetchUser);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data...</div>;
  }

  return (
    <Controller>
      <button
        className={trackState.audio ? 'on' : ''}
        onClick={() => mute('audio')}
      >
        {trackState.audio ? <FaVolumeUp /> : <FaVolumeMute />}
      </button>
      <button
        className={trackState.video ? 'on' : ''}
        onClick={() => mute('video')}
      >
        {trackState.video ? <FaVideo /> : <FaVideoSlash />}
      </button>
      <div>{data.nickname}</div>
      {/* <button onClick={() => leaveChannel()}>나가기</button> */}
    </Controller>
  );
};

const Controller = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 10px;
  margin-left: 10px;

  > div {
    margin: 0 20px 0 auto;
    display: flex;
    align-items: center;
    height: 35px;
    background-color: #ffffff4c;
    padding: 2px 5px;
    border-radius: 10px;
  }

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--gray-07);
    width: 50px;
    height: 40px;
    background-color: var(--gray-07);
    transition: 0.5;
    border: none;
    font-size: 20px;
    border-radius: 10px;
    &:hover {
      background-color: var(--gray-06);
    }
  }
`;
export default VideoController;
