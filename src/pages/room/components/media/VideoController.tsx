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
