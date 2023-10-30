import React from 'react';
import styled from 'styled-components';
import 예시이미지 from '../../../images/ranking/3rd.svg';

type LevelProps = {};

const Level: React.FC<LevelProps> = () => {
  return (
    <Container>
      <TextBox>
        <p>000님은</p>
        <p>Level 0 무거운엉덩이</p>
      </TextBox>
      <img src={예시이미지} alt="Level" />
    </Container>
  );
};

const Container = styled.div`
  box-shadow: 2px 4px 9px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 0px 30px;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 120px;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  line-height: 123.5%; /* 49.4px */
  letter-spacing: 0.25px;
  font-size: 40px;
  font-weight: 700;
`;

export default Level;
