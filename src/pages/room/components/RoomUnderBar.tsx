import React from 'react';
import styled from 'styled-components';

type RoomUnderBarProps = {
  
};

const RoomUnderBar:React.FC<RoomUnderBarProps> = () => {
  
  return <Body>언더바에는 마이크와 카메라 세팅이 들어가요</Body>
}

const Body = styled.div`
  width: 100vw;
  height: 60px;
  background-color: green;
`

export default RoomUnderBar;