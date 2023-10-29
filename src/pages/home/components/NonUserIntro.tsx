import React from 'react';
import styled from 'styled-components';
import nonUserIntro from '../../../images/main/nonUserIntro.svg'

type NonUserIntroProps = {};

const NonUserIntro: React.FC<NonUserIntroProps> = () => {
  return (
    <Container>
      <img src={nonUserIntro} alt="user intro"/>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  >img{
    width: 100%;
  }
`;

export default NonUserIntro;
