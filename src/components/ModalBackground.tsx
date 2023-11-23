import React from 'react';
import styled from 'styled-components';
import { StringLiteralType } from 'typescript';

type ModalBackgroundProps = {
  blur: string;
};

const ModalBackground: React.FC<ModalBackgroundProps> = ({ blur }) => {
  return <BackGroundColor blur={blur}/>;
};
const BackGroundColor = styled.div<{ blur: string}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(blur);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;
export default ModalBackground;