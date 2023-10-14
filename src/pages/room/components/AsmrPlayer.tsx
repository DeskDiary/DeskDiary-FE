import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styled from 'styled-components';
type AsmrPlayerProps = {};

const AsmrPlayer: React.FC<AsmrPlayerProps> = () => {
  const asmrList = [
    { title: '[ASMR] 장작타는소리', src: '/audio/장작타는소리.mp3' },
    { title: '[ASMR] 숲 속 새 소리', src: '/audio/숲속새소리.mp3' },
    { title: '[ASMR] 숲 속 강물 소리', src: '/audio/숲속강물소리.mp3' },
    { title: '[ASMR] 조금 강한 비 소리', src: '/audio/조금강한비소리.mp3' },
  ];

  const [audioSrc, setAudioSrc] = useState<string>(asmrList[0].src);

  const asmrListOnclickHandler = (num: number) => {
    setAudioSrc(asmrList[num].src);
  };

  return (
    <Body>
      <AsmrList>
        {asmrList.map((item, i) => {
          return (
            <AsmrListBox
              key={item.title}
              onClick={() => {
                asmrListOnclickHandler(i);
              }}
            >
              {item.title}
            </AsmrListBox>
          );
        })}
      </AsmrList>
      <AudioPlayer src={audioSrc} onPlay={e => console.log('onPlay')} />
    </Body>
  );
};
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AsmrList = styled.div`
  background-color: beige;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AsmrListBox = styled.div`
  cursor: pointer;
  padding: 10px;
`;
export default AsmrPlayer;
