import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 일시정지 from '../../../images/audio/audio_stop.svg';
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
        <p>{asmrList[current].title}</p>
        <audio ref={audioRef} src={asmrList[current].src} />
      </div>
      <div>
        <PlayButton onClick={togglePlay} />
        <button onClick={nextCurrentHandler}>앞으로가기</button>
        <button onClick={backCurrentHandler}>뒤로가기</button>
        <VolumeSlider
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </Body>
  );
};

const Body = styled.div`
  width: calc(90% - 5% - 10px);
  background-color: white;
  border: 1px solid black;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  padding: 5%;
  align-items: center;
`;
const AudioImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 10px;
`;

const PlayButton = styled.button`
  background-image: url(${일시정지});
  background-size: cover;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
`;

const VolumeSlider = styled.input`
  width: 100px;
  accent-color : var(--primary-01);
`;


export default AsmrPlayer;
