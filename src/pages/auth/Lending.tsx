import React, { useEffect } from 'react';
import styled from 'styled-components';
import sample from '../../images/lending-image.png';
import { Link } from 'react-router-dom';
import { getCookie } from '../../auth/cookie';
import logo from '../../images/logo.svg';
import { useNavigate } from 'react-router-dom';

type LendingProps = {};

const Lending: React.FC<LendingProps> = () => {
  useEffect(() => {
    window.sessionStorage.setItem('visited', 'true');
  }, []);

  return (
    <Container>
      <BoxContents>
        <p>언제 어디든지 나의 책상이 될 수 있는 곳에서 만나요</p>
        <Logo src={logo} alt={logo}/>
        <Text>
          온라인 캠 스터디 서비스<span>책상일기</span>
        </Text>
        <StartButton to="/">서비스 시작하기</StartButton>
      </BoxContents>
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

const Logo = styled.img`
  width: 116px;
  height: 141px;
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
    /* overflow: hidden; */
    object-fit: cover;
    height: 100%;
    /* filter: grayscale(100%); */
  }
`;

const BoxContents = styled.div`
  gap: 20px;

  width: 1000px;
  height: 850px;

  margin-top: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  

  background-image: url(${sample});
  background-size: cover; // 이미지 사이즈 조절
  background-repeat: no-repeat; // 이미지 반복 설정
  background-position: center; // 이미지 위치 설정

  > p {
    margin-top: 90px;
    color: white;
    font-size: 30px;
    margin-bottom: 10px;
  }
`;

const Text = styled.div`
  color: var(--primary-01);
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  > span {
    color: var(--primary-01);
    font-weight: 600;
    margin-left: 5px;
    font-size: 17px;
  }
`;

const StartButton = styled(Link)`
  background-color: var(--primary-01);
  width: 300px;
  height: 50px;
  font-size: 17px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default Lending;
