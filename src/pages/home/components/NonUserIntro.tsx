import React from 'react';
import styled from 'styled-components';
import nonUserIntro from '../../../images/main/nonUserIntro.svg'
import { blue, orange, purple, yellow } from '../../../images/character';

type NonUserIntroProps = {};

const NonUserIntro: React.FC<NonUserIntroProps> = () => {

  const characters = [ blue, orange, purple, yellow];
  return (
    <Container>
      <Blue>
        <img src={blue} alt="character" />
      </Blue>
      <Orange>
        <img src={orange} alt="character" />
      </Orange>
      <Purple>
        <img src={purple} alt="character" />
      </Purple>
      <Yellow>
        <img src={yellow} alt="character" />
      </Yellow>
      <img src={nonUserIntro} alt="user intro"/>
    </Container>
  );
};

const Blue = styled.div`
  position : absolute;
  top: -85px;
  left: 0px;
`

const Orange = styled.div`
  position : absolute;
  top: -120px;
  right: 0px;
`

const Purple = styled.div`
  position : absolute;
  top: -90px;
  right: 250px;
`

const Yellow = styled.div`
  position : absolute;
  top: -110px;
  left: 200px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  position: relative;

  >img{
    width: 100%;
  }
`;

export default NonUserIntro;
