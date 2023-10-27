import React from 'react';
import styled from 'styled-components';
import sample from '../../images/lending-image.png';
import { Link } from 'react-router-dom';
import { getCookie } from '../../auth/cookie';
import logo from '../../images/logo.svg';

type LendingProps = {};

const Lending: React.FC<LendingProps> = () => {
  const token = getCookie('token');

  return (
    <Container>
      <Contents>
        <Box>
          <img src={sample} />
        </Box>
        <BoxContents>
          <p>언제 어디든지 나의 책상이 될 수 있는 곳에서 만나요</p>
          <Logo to="/" />
          <Text>
            온라인 캠 스터디 서비스<span>책상일기</span>
          </Text>
          <StartButton to="/">서비스 시작하기</StartButton>
        </BoxContents>
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

const Logo = styled(Link)`
  background: url(${logo}) no-repeat center;
  width: 62px;
  height: 73px;
`;

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
  background-color: #86c9fa;
`;

const Contents = styled.div`
  width: 1200px;
  min-height: 100vh;
  /* background-color: var(--gray-02); */
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  position: relative;
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
  /* background-color: var(--gray-03); */
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  > img {
    overflow: hidden;
    object-fit: cover;
    height: 100%;
    /* filter: grayscale(100%); */
  }
`;

const BoxContents = styled.div`
  position: absolute;
  bottom: 500px;
  z-index: 50;
  gap: 30px;

  width: 750px;
  height: 330px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > p {
    color: white;
    font-size:30px;
  }
`;

const Text = styled.div`
  color: var(--primary-01);
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  >span{
    color: var(--primary-01);
    font-weight: 600;
    margin-left: 5px;
    font-size: 17px;
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
  border-radius: 10px;
  font-size: 24px;
  box-shadow: 2px 2px 4px 2px rgba(155, 155, 155, 0.5);
`;
export default Lending;
