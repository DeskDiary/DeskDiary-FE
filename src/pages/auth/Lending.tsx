import React, { useEffect } from 'react';
import styled from 'styled-components';
import sample from '../../images/lending-image.png';
import { Link } from 'react-router-dom';
import { getCookie } from '../../auth/cookie';
import logo from '../../images/logo.svg';
import { useNavigate } from 'react-router-dom';
import { AnyNsRecord } from 'dns';

type LendingProps = {};

const Lending: React.FC<LendingProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.sessionStorage.setItem('visited', 'true');
  }, []);

  const goService = (event: any) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <Container>
      <BoxContents>
        <Logo src={logo} alt={logo} />
        <Title>
          <div>언제 어디든지</div>
          <div>나의 책상이 될 수 있는 곳에서 만나요</div>
        </Title>

        <Text>
          <div>공부,취미 혼자 시작하기 힘들다면</div>
          <div>같은 고민을 가진 사람들과 캠으로 소통하면서</div>
          <div>서로의 의지를 책상 위에서 응원 해주는 온라인 캠서비스</div>
          <div>책상일기</div>
        </Text>
      </BoxContents>
      <StartButton onClick={e => goService(e)}>서비스 시작하기</StartButton>
      <LendingImg src={sample} alt="lending-image" />
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

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > div {
    color: white;
    height: 35px;
    font-size: 30px;
    font-weight: 700;
  }
`;

const LendingImg = styled.img`
  position: fixed;
  width: 800px;
  bottom: 300px;
`;

const Logo = styled.img`
  width: 50px;
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: #1a81e8;

  position: relative;
`;

const Footer = styled.div`
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  position: fixed;
  bottom: 0;
  left: 0;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 20px;
  position: absolute;
  top: 50px;
  z-index: 50;
`;

const Text = styled.div`
  color: var(--primary-01);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(26, 129, 232, 0.2);
  border-radius: 20px;

  > div {
    height: 22px;
    font-size: 17px;
    color: white;
  }
`;

const StartButton = styled.div`
  /* background-color: var(--primary-01); */
  width: 180px;
  height: 40px;
  font-size: 20px;
  color: white;
  border: 5px solid white;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.1s ease-in-out; // 버튼이 움직이는 걸 부드럽게!
  background-color: #1a81e8;
  padding: 5px;
  margin-top: 580px;
  cursor: pointer;

  &:hover {
    background-color: #4a9cee;
  }

  box-shadow: 0 0 0 1px #6698cb inset, 0 0 0 2px rgba(255, 255, 255, 0.15) inset,
    0 8px 0 0 rgba(110, 164, 219, 0.7), 0 8px 0 1px rgba(0, 0, 0, 0.4),
    0 8px 8px 1px rgba(0, 0, 0, 0.5);

  &:active {
    transform: translateY(4px); // 버튼을 아래로 4px 움직여
    box-shadow: 0 0 0 1px #6191c2 inset,
      0 0 0 2px rgba(255, 255, 255, 0.15) inset,
      0 4px 0 0 rgba(110, 164, 219, 0.7), 0 4px 0 1px rgba(0, 0, 0, 0.4),
      0 4px 8px 1px rgba(0, 0, 0, 0.5);
  }
`;
export default Lending;
