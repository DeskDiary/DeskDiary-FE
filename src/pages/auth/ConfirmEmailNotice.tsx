import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../images/logo-2.svg';

type ConfirmEmailNoticeProps = {};

const ConfirmEmailNotice: React.FC<ConfirmEmailNoticeProps> = () => {
  return (
    <Container>
      <img src={logo} alt="logo" />
      <Content>
        <p>입력 해 주신 이메일 주소로</p>
        <p>가입 확인 메일을 전송했습니다.</p>
      </Content>
      <Content>
        <p>메일을 확인하셨다면 아래의 <LoginText>로그인하기</LoginText> 버튼을 눌러주세요</p>
      </Content>

      <ButtonGroup>
        <Button to="/login" buttonType="login">
          로그인하러가기
        </Button>
        <Button to="join" buttonType="join">
          회원가입 다시하기
        </Button>
      </ButtonGroup>
    </Container>
  );
};

const LoginText = styled.span`
  background-color: var(--primary-01);
  padding: 8px;
  font-size: 17px;
  width: 80px;
  opacity: 0.5;
  color: white;
  border-radius: 10px;
`

const Content = styled.div`
  text-align: center;
  > p {
    font-size: 24px;
    height: 30px;
  }
`;

const Button = styled(Link)<{ buttonType: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 50px;
  border: 2px solid var(--primary-01);
  border-radius: 10px;
  background-color: ${props =>
    props.buttonType === 'login' ? 'var(--primary-01)' : 'white'};
  color: ${props =>
    props.buttonType === 'join' ? 'var(--primary-01)' : 'white'};
  font-size: 17px;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;

  gap: 50px;

  > img {
    width: 100px;
  }
`;
export default ConfirmEmailNotice;
