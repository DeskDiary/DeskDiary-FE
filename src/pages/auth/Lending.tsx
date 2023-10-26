import React from 'react';
import styled from 'styled-components';
import sample from '../../images/lending-sample.png';
import { Link } from 'react-router-dom';
import { getCookie } from '../../auth/cookie';

type LendingProps = {};

const Lending: React.FC<LendingProps> = () => {
  const token = getCookie('token');

  return (
    <Container>
      <Contents>
        <Box>
          <img src={sample} />
          <StartButton to={token ? "/" : "/login"}>서비스 시작하기</StartButton>
        </Box>
        <Box>
          <StartButton to="/login">서비스 시작하기</StartButton>
        </Box>
      </Contents>
      <Footer>
        <FooterBody>
          <FooterTitle>Site Map</FooterTitle>
          <FooterContents>
            <FooterContent>개인정보처리방침</FooterContent>
            <FooterContent>개인정보처리방침</FooterContent>
            <FooterContent>개인정보처리방침</FooterContent>
          </FooterContents>
          <hr />
          <FooterTitle>책상일기</FooterTitle>
          <FooterContents>
            <FooterContent>FE | 박서현 김성호</FooterContent>
            <FooterContent>BE | 남현재 서민정 손현원</FooterContent>
            <FooterContent>UIUX | 이다현</FooterContent>
          </FooterContents>
        </FooterBody>
      </Footer>
    </Container>
  );
};

const FooterBody = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  > hr {
    width: 100%;
    margin: 30px 0;
  }
`;

const FooterContents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 30px;
`;

const FooterContent = styled.div`
  color: white;
  font-size: 13px;
  font-weight: 500;
`;

const FooterTitle = styled.div`
  color: white;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Contents = styled.div`
  width: 1200px;
  min-height: 100vh;
  background-color: var(--gray-02);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Footer = styled.div`
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  margin-top: 300px;
`;

const Box = styled.div`
  width: 100%;
  background-color: var(--gray-03);
  border: 1px solid var(--gray-05);
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: url=(sample);
  position: relative;
  overflow: hidden;

  > img {
    overflow: hidden;
    object-fit: cover;
    height: 100%;
    filter: grayscale(100%);
  }
`;

const StartButton = styled(Link)`
  background-color: var(--primary-01);
  width: 400px;
  height: 60px;
  font-size: 17px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom : 100px;
  right : 100px;
`;
export default Lending;
