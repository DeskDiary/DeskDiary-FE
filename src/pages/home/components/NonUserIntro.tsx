import React from 'react';
import styled from 'styled-components';

type NonUserIntroProps = {};

const NonUserIntro: React.FC<NonUserIntroProps> = () => {
  return (
    <Container>
      <Text>무거운 엉덩이의 주인공이 되어보세요</Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1525px;
  height: 243px;
  background-color: #d9d9d9;
`;

const Text = styled.div`
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 54px */
  letter-spacing: -0.36px;
`;
export default NonUserIntro;
