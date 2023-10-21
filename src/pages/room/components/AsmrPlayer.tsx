import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 재생 from '../../../images/audio/Button_Play.svg';
import 일시정지 from '../../../images/audio/audio_stop.svg';
import 뒤로가기 from '../../../images/audio/back_button.svg';
import 앞으로가기 from '../../../images/audio/front_button.svg';
import 음소거 from '../../../images/audio/volume_off.svg';
import 소리최대 from '../../../images/audio/volume_up.svg';
import 이미지 from '../../../images/logo.png';
type AsmrPlayerProps = {};

const asmrList = [
  { title: '숲속강물소리', src: '/audio/숲속강물소리.mp3', img: '' },
  { title: '숲속새소리', src: '/audio/숲속새소리.mp3', img: '' },
  { title: '장작타는소리', src: '/audio/장작타는소리.mp3', img: '' },
  { title: '조금강한비소리', src: '/audio/조금강한비소리.mp3', img: '' },
];

const AsmrPlayer: React.FC<AsmrPlayerProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // 초기 볼륨을 1로 설정 (최대 볼륨)
  const audioRef = React.createRef<HTMLAudioElement>();
  const [current, setCurrent] = useState<number>(0);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextCurrentHandler = () => {
    if (current === asmrList.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  };

  const backCurrentHandler = () => {
    if (current === 0) {
      setCurrent(asmrList.length - 1);
    } else {
      setCurrent(current - 1);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, current]);

  return (
    <Body>
      <AudioImg src={이미지} alt="" />
      <div>
        <Title>{asmrList[current].title}</Title>
        <audio ref={audioRef} src={asmrList[current].src} />
      </div>
      <PlayBox>
        <BackButton onClick={backCurrentHandler} img={뒤로가기} />
        <PlayButton onClick={togglePlay} isPlaying={isPlaying} />
        <FrontButton onClick={nextCurrentHandler} img={앞으로가기} />
      </PlayBox>
      <VolumeBox>
        <MuteButton img={음소거} />
        <VolumeSlider
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
        <MaxSoundButton img={소리최대} />
      </VolumeBox>
    </Body>
  );
};

const Body = styled.div`
  width: 100%;
  background-color: gray;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AudioImg = styled.img`
  margin-top: 21px;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 14px;
  color: white;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayBox = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;

const PlayButton = styled.button<{ isPlaying: boolean }>`
  background-image: url(${props => (props.isPlaying ? 일시정지 : 재생)});
  background-size: cover;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: transparent;
`;

const FrontButton = styled.button<{ img: any }>`
  background-image: url(${props => props.img});
  width: 16px;
  height: 20px;
  border: none;
  background-color: transparent;
`;

const BackButton = styled.button<{ img: any }>`
  background-image: url(${props => props.img});
  width: 16px;
  height: 20px;
  border: none;
  background-color: transparent;
`;

const VolumeBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 310px;
  margin-bottom: 16px;
`;

const VolumeSlider = styled.input`
  width: 200px;
  accent-color: var(--primary-01);
  height: 5px;
`;

const MuteButton = styled.button<{ img: any }>`
  background-image: url(${props => props.img});
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
`;

const MaxSoundButton = styled.button<{ img: any }>`
  background-image: url(${props => props.img});
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
`;

export default AsmrPlayer;
