import React from 'react';
import styled from 'styled-components';
import nonUserIntro from '../../../images/main/nonUserIntro.svg'

type NonUserIntroProps = {};

const NonUserIntro: React.FC<NonUserIntroProps> = () => {
  return (
    <Container>
      <img src={nonUserIntro} />
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
  background-color: #d9d9d9;
`;

export default NonUserIntro;
