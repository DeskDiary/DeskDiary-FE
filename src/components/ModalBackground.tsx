import React from 'react';
import styled from 'styled-components';

type ModalBackgroundProps = {
  
};

const ModalBackground:React.FC<ModalBackgroundProps> = () => {
  
  return <BackGroundColor>Have a good coding</BackGroundColor>
}
const BackGroundColor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(
    5px
  ); // 블러 정도 설정. 숫자를 조절해서 블러 정도를 변경할 수 있어.
  display: flex;
  justify-content: center;
  align-items: center;
`
export default ModalBackground;