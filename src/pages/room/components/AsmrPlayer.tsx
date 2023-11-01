import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {audio_stop, back_button, Button_Play, front_button, volume_off, volume_up} from '../../../images/audio';

type AsmrPlayerProps = {};

const asmrList = [
  {
    title: '숲속강물소리',
    src: '/audio/숲속강물소리.mp3',
    img: '/images/asmr_river.jpg',
  },
  {
    title: '숲속새소리',
    src: '/audio/숲속새소리.mp3',
    img: '/images/asmr_bird.jpg',
  },
  {
    title: '장작타는소리',
    src: '/audio/장작타는소리.mp3',
    img: '/images/asmr_fire.jpg',
  },
  {
    title: '조금강한비소리',
    src: '/audio/조금강한비소리.mp3',
    img: '/images/asmr_rain.jpg',
  },
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
      <AudioImg src={asmrList[current].img} alt="" />
      <div>
        <Title>{asmrList[current].title}</Title>
        <audio ref={audioRef} src={asmrList[current].src} />
      </div>
      <PlayBox>
        <BackButton onClick={backCurrentHandler} img={back_button} />
        <PlayButton onClick={togglePlay} isPlaying={isPlaying} />
        <FrontButton onClick={nextCurrentHandler} img={front_button} />
      </PlayBox>
      <VolumeBox>
        <MuteButton img={volume_off} />
        <VolumeSlider
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
        <MaxSoundButton img={volume_up} />
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
  background-image: url(${props => (props.isPlaying ? audio_stop : Button_Play)});
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
