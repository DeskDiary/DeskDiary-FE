import React from 'react';
import styled from 'styled-components';

type ErrorProps = {};

const Error: React.FC<ErrorProps> = () => {
  return (
    <Container>
      <Text>없는 페이지 입니다</Text>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font-size: 50px;
`;
export default Error;
