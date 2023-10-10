import styled from '@emotion/styled';
import React from 'react';

type MypageProps = {};

const Mypage: React.FC<MypageProps> = () => {
  return <Container>마이페이지입니당~!~!~!</Container>;
};

const Container = styled.div`
  width: 1200px;
  min-height: 100vh-60px;
  background-color: lightblue;
`;
export default Mypage;
