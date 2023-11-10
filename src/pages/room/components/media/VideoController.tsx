import React, { useState, useCallback } from 'react';
import { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import { useClient } from './config';
import {
  MdOutlineExitToApp,
  MdScreenShare,
  MdStopScreenShare,
} from 'react-icons/md';
import {
  FaVolumeMute,
  FaVolumeUp,
  FaVideo,
  FaVideoSlash,
} from 'react-icons/fa';
import styled from 'styled-components';
import Screenshare from './Screenshare';

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
  const [screenshare, setScreenshare] = useState(false);

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

  const handleScreenShare = useCallback(() => {
    setScreenshare(prev => !prev);
  }, []);

  return (
    <Controller>
      <button onClick={() => mute('audio')}>
        {trackState.audio ? (
          <FaVolumeUp />
        ) : (
          <FaVolumeMute style={{ color: '#e90000' }} />
        )}
      </button>
      <button onClick={() => mute('video')}>
        {trackState.video ? (
          <FaVideo />
        ) : (
          <FaVideoSlash style={{ color: '#e90000' }} />
        )}
      </button>
      {!trackState.video && (
        <NonCam>
          <FaVideoSlash style={{ fontSize: '50px', color: '#e90000' }} />
        </NonCam>
      )}
      <button onClick={handleScreenShare}>
        {screenshare ? <MdScreenShare fill="#337CCF" /> : <MdStopScreenShare fill="#D8D9DA" />}
      </button>
      {screenshare && (
        <Screenshare
          preTracks={tracks}
          trackState={trackState}
          screenshare={screenshare}
          setStart={setStart}
          setScreenshare={setScreenshare}
        />
      )}
    </Controller>
  );
};

const NonAudio = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
`;

const NonCam = styled.div`
  position: absolute;
  top: -125px;
  left: 170px;
`;

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
    color: #337CCF;
    &:hover {
      background-color: var(--gray-06);
    }
  }
`;
export default VideoController;
