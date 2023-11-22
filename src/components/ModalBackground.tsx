import React from 'react';
import styled from 'styled-components';

type ModalBackgroundProps = {
  blur: string;
};

const ModalBackground: React.FC<ModalBackgroundProps> = ({ blur }) => {
  return <BackGroundColor blur={blur}>Have a good coding</BackGroundColor>;
};
const BackGroundColor = styled.div<{ blur: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  /* backdrop-filter: blur(
    5px
  ); // 블러 정도 설정. 숫자를 조절해서 블러 정도를 변경할 수 있어. */
  backdrop-filter: blur(blur);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;
export default ModalBackground;
