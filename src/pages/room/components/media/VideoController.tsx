import React, { useState, useCallback, useEffect } from 'react';
import { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import { useClient } from './config';
import { MdScreenShare, MdStopScreenShare } from 'react-icons/md';
import {
  FaVolumeMute,
  FaVolumeUp,
  FaVideo,
  FaVideoSlash,
} from 'react-icons/fa';
import styled from 'styled-components';
import Screenshare from './Screenshare';
import { isScreenshare } from '../../../../recoil/CamAtom';
import { useRecoilState } from 'recoil';
import { toast } from 'sonner';
import {blue} from '../../../../images/character'

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
  const [screenShareTrack, setScreenShareTrack] = useRecoilState(isScreenshare);

  const mute = async (type: 'audio' | 'video') => {
    // 컴, 오디어 끄기
    if (type === 'audio') {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState(ps => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === 'video') {
      if(screenshare) {
        // setTrackState(ps => {
        //   console.log(' 화면공유 되어있었음');
        //   return { ...ps, video: false };
        // });
        toast.error('화면 공유 중에는 카메라를 설정할 수 없습니다.');
        return ;
      }
      await tracks[1].setEnabled(!trackState.video);
      setTrackState(ps => {
        console.log('비디오트랙 변경');
        return { ...ps, video: !ps.video };
      });
    }
  };

  const handleScreenShare = useCallback(() => {
    setScreenshare(prev => !prev);
    console.log('🐛🐛🐛setScreenshare');
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
          {/* <FaVideoSlash style={{ fontSize: '50px', color: '#e90000' }} /> */}
          <img src={blue} alt='' />
        </NonCam>
      )}
      <button onClick={handleScreenShare}>
        {screenshare ? (
          <MdScreenShare fill="#337CCF" />
        ) : (
          <MdStopScreenShare fill="#D8D9DA" />
        )}
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

const Test = styled.div`
  color: white;
`;

const NonAudio = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
`;

const NonCam = styled.div`
  position: absolute;
  top: -150px;
  left: 148px;
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
    color: #337ccf;
    &:hover {
      background-color: var(--gray-06);
    }
  }
`;
export default VideoController;
