import React, { useState } from 'react';
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

  const { data, isLoading, error } = useQuery('cam-user', fetchUser);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생</div>;
  }

  return (
    <Controller>
      <button
        onClick={() => mute('audio')}
      >
        {trackState.audio ? <FaVolumeUp /> : <FaVolumeMute style={{ color: "#ad0101"}}/>}
      </button>
      <button
        onClick={() => mute('video')}
      >
        {trackState.video ? <FaVideo /> : <FaVideoSlash style={{ color: "#ad0101"}}/>}
      </button>
      <div>{data.nickname}</div>
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
  margin-left: 0px;

  > div {
    margin: 0 15px 0 auto;
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
    background-color: var(--gray-09);
    transition: 0.5;
    border: none;
    font-size: 20px;
    border-radius: 10px;
    color: #007500;
    &:hover {
      background-color: var(--gray-06);
    }
  }
`;
export default VideoController;
