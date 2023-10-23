import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

type ErrorProps = {};

const Error: React.FC<ErrorProps> = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Text>없는 페이지 입니다</Text>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        이전 페이지로 이동하기
      </button>
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
