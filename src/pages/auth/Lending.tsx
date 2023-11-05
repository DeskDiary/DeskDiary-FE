import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { logo, lendingImage } from '../../images';

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

        <LendingImg src={lendingImage} alt="lending-image" />
        <StartButton onClick={e => goService(e)}>서비스 시작하기</StartButton>
      </BoxContents>

      <Footer>
        <FooterBody>
          <FooterTitle>Site Map</FooterTitle>
          <FooterContents>
            <FooterContent>이용약관</FooterContent>
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
  margin-top: 20px;
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
  @media (max-width: 768px) {
    div {
      font-size: 1.5em;
    }
  }
  @media (max-width: 400px) {
    div {
      font-size: 1em;
    }
  }
`;

const LendingImg = styled.img`
  width: 800px;
  max-width: 80%;
  top: 150px;
`;

const Logo = styled.img`
  width: 50px;
`;

const FooterBody = styled.div`
  width: calc(100vw - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-right: 2rem;
  margin-left: 2rem;
  flex-wrap: wrap;
  > hr {
    width: 100%;
    margin: 15px 0;
  }
`;

const FooterContents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
  gap: 30px;
  @media (max-width: 768px) {
    flex-direction: column; /* 모바일 화면에서는 컬럼(col)로 변경 */
    gap: 10px;
  }
`;

const FooterContent = styled.div`
  color: white;
  font-size: 13px;
  font-weight: 500;
`;

const FooterTitle = styled.div`
  color: white;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Container = styled.div`
  width: 100vw; // calc(100vw - 10px);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: #1a81e8;

  position: relative;
`;

const Footer = styled.div`
  /* width: calc(100vw - 10px); */
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const BoxContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  margin-top: 100px;
  padding-bottom: 250px;
  position: relative;
`;

const Text = styled.div`
  color: var(--primary-01);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(26, 129, 232, 0.2);
  border-radius: 20px;
  margin-top: 10px;

  > div {
    height: 22px;
    font-size: 17px;
    font-weight: 500;
    color: white;
  }
  
  @media (max-width: 400px) {
    div {
      font-size: 0.7em;
    }
  }
`;

// const StartButton = styled.div`
//   width: 180px;
//   height: 40px;
//   font-size: 17px;
//   font-weight: 500;
//   color: white;
//   border: 5px solid white;
//   border-radius: 30px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: transform 0.2s ease-in-out; // 버튼이 움직이는 걸 부드럽게!
//   background-color: #1a81e8;
//   padding: 5px;
//   margin-top: 280px;
//   z-index: 100;

//   cursor: pointer;

//   &:hover {
//     background-color: #4a9cee;
//   }

//   box-shadow: 0 0 0 1px #6698cb inset, 0 0 0 2px rgba(255, 255, 255, 0.15) inset,
//     0 8px 0 0 rgba(110, 164, 219, 0.7), 0 8px 0 1px rgba(0, 0, 0, 0.4),
//     0 8px 8px 1px rgba(0, 0, 0, 0.5);

//   &:active {
//     transform: translateY(4px); // 버튼을 아래로 4px 움직여
//     box-shadow: 0 0 0 1px #6191c2 inset,
//       0 0 0 2px rgba(255, 255, 255, 0.15) inset,
//       0 4px 0 0 rgba(110, 164, 219, 0.7), 0 4px 0 1px rgba(0, 0, 0, 0.4),
//       0 4px 8px 1px rgba(0, 0, 0, 0.5);
//   }
// `;

// SCSS 변수를 JS 변수로 변환
const colors = {
  bg: '#fff',
  text: '#004891',
  lightPink: '#fff0f0',
  pink: '#ffe9e9',
  darkPink: '#f9c4d2',
  pinkBorder: '#b18597',
  pinkShadow: '#ffe3e2',
  lightBlue: '#ddeeff',
  darkBlue: '#83b5e4',
  blueShadow: '#48657c73',
  blueBorder: '#6887a0',
  blue: '#c2e1ff',
  lightYellow: '#fff9db', // 밝은 노란색
  yellow: '#ffeecc', // 기본 파스텔 노란색
  darkYellow: '#ffcc66', // 조금 더 진한 노란색
  yellowBorder: '#ffb84d', // 노란색 테두리
  yellowShadow: '#f3e5c0c7', // 노란색 그림자

  mainButton: '#ffd580', // 주버튼 색상, 밝은 파스텔 오렌지
  buttonHover: '#ffcc66', // 호버 시 색상, 조금 더 진한 오렌지
  buttonActive: '#ffb84d', // 클릭 시 색상, 더 진한 오렌지
  buttonText: '#382b22', // 버튼 텍스트 색상, 이미지에 있는 글씨색과 같은 색
};

// button의 공통 스타일
const StyledButton = styled.button`
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  font-size: inherit;
  font-family: inherit;

  -webkit-appearance: none; // iOS에서 버튼의 기본 스타일을 제거
  -moz-appearance: none;    // Firefox에서 버튼의 기본 스타일을 제거
  touch-action: manipulation; // iOS에서 버튼 클릭 시 발생할 수 있는 300ms 지연 제거
`;

// Learn More 버튼에 특화된 스타일
const StartButton = styled(StyledButton)`
  font-weight: 600;
  color: ${colors.text};
  text-transform: uppercase;
  padding: 1.25em 2em;
  background: ${colors.lightBlue};
  border: 2px solid ${colors.blueBorder};
  border-radius: 15px;
  transform-style: preserve-3d;
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
    background 150ms cubic-bezier(0, 0, 0.58, 1);
  /* position: fixed; */
  /* top:67%; */
  /* left: 45%; */
  font-size: 17px;
  font-weight: 600;
  /* z-index: 1000; */
  margin-bottom: 40px;

  -webkit-transform-style: preserve-3d; // iOS에서 3D 변환 스타일 유지
  -moz-transform-style: preserve-3d;    // Firefox에서 3D 변환 스타일 유지
  
  &:hover {
    background: ${colors.blue};
    transform: translate(0, 0.25em);
    &::before {
      box-shadow: 0 0 0 2px ${colors.blueBorder},
        0 0.5em 0 0 ${colors.blueShadow};
      transform: translate3d(0, 0.5em, -1em);
    }
  }

  &:active {
    background: ${colors.blue};
    transform: translate(0em, 0.75em);
    &::before {
      box-shadow: 0 0 0 2px ${colors.blueBorder}, 0 0 ${colors.blueShadow};
      transform: translate3d(0, 0, -1em);
    }
  }

  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${colors.darkBlue};
    border-radius: inherit;
    box-shadow: 0 0 0 2px ${colors.blueBorder},
      0 0.625em 0 0 ${colors.blueShadow};
    transform: translate3d(0, 0.75em, -1em);
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
      box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
  }
`;

export default Lending;
