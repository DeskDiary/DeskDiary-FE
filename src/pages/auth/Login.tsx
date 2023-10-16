import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { getCookie, setTokenCookie } from '../../auth/cookie';
import XIcon from '../../images/Vector.svg';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const token = getCookie('token');
  useEffect(() => {
    if (token) {
      alert('이미 로그인했습니다.');
      navigate(-1);
    }
  }, [token, navigate]);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  console.log(serverUrl);

  const loginMutation = useMutation(async (formData: FormData) => {
    try {
      const url = `${serverUrl}auth/login`;
      console.log(url);

      const requestBody = {
        email: formData.get('email'),
        password: formData.get('password'),
      };

      const response = await axios.post(url, requestBody);
      const token = response.headers.authorization.split(' ')[1];
      console.log(token);
      setTokenCookie(token);
      alert(`로그인 성공`);
      navigate('/')
      // return response.data; // 여기서는 로그인 API에서 반환한 데이터를 반환
    } catch (error) {
      console.error(error);

    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 이벤트의 기본 동작 ( 리렌더링 ) 차단
    const formData = new FormData(event.currentTarget);
    // form 내의 데이터를 읽어온다. name 속성을 키로 그 값들을 가지고 있다.
    console.log({
      email: formData.get('email'),
      password: formData.get('password'),
    });
    loginMutation.mutate(formData);
  };

  const inputClear = () => {
    alert(`x클릭`);
  };

  // useEffect(() => {

  // }, [])

  const [idSaveCheckButton, setIdSaveCheckButton] = useState<boolean>(false);
  console.log(idSaveCheckButton);
  const handleCheckChange = () => {
    console.log('클릭됨');
    setIdSaveCheckButton(!idSaveCheckButton);
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <Title>로그인</Title>
      <InputDiv>
        <Ptag>ID</Ptag>
        <InputBox>
          <InputTag
            type="email"
            placeholder="이메일을 입력해주세요."
            name="email"
          />
          <img src={XIcon} alt="clear" onClick={inputClear} />
        </InputBox>
        <Ptag>등록되지 않은 이메일입니다.</Ptag>
      </InputDiv>
      <InputDiv>
        <Ptag>PW</Ptag>
        <InputBox>
          <InputTag
            type="password"
            placeholder="비밀번호를 입력해주세요."
            name="password"
          />
          <img src={XIcon} alt="clear" onClick={inputClear} />
        </InputBox>
        <Ptag>비밀번호를 확인해주세요.</Ptag>
      </InputDiv>
      <IdSaveBox>
        <IdDiv>
          <input
            type="checkbox"
            value="idSave"
            checked={idSaveCheckButton}
            onChange={handleCheckChange}
          />
          <p>아이디 저장</p>
        </IdDiv>
        <div>
          <p>비밀번호 찾기</p>
        </div>
      </IdSaveBox>
      <LogInButton type="submit">LOGIN</LogInButton>
      <Ptag2>SNS 계정으로 로그인</Ptag2>
      <SNSDiv>
        <SNSButton>카카오</SNSButton>
        <SNSButton>구굴</SNSButton>
      </SNSDiv>
      <Ptag2>아직 회원이 아니신가요?</Ptag2>
      <JoinButton>JOIN</JoinButton>
    </LoginForm>
  );
};

const LoginForm = styled.form`
  width: 582px;
  height: calc(100vh - 76px);
  /* opacity: 0.5; */
  background: #ededed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  width: 400px;
  color: #000;
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.25px;
  margin-left: auto;
  margin-right: auto;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
`;

const Ptag = styled.div`
  display: flex;
  width: 380px;
  padding: 10px;
  align-items: center;
  gap: 10px;
  height: 19px;
  font-size: 15px;
`;

const InputBox = styled.div`
  display: flex;
  width: 370px;
  height: 28px;
  padding: 10px 15px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  border: 1px solid var(--gray-07, #757575);
  background: #fff;
`;

const InputTag = styled.input`
  color: black;
  border: none;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const IdSaveBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  gap: 204px;
`;

const IdDiv = styled.div`
  display: flex;
  gap: 8px;
`;

const LogInButton = styled.button`
  display: flex;
  width: 380px;
  height: 40px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  opacity: 0.5;
  background: #999;
  color: #fff;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 123.5%; /* 29.64px */
  letter-spacing: 0.25px;
`;

const Ptag2 = styled.div`
  display: flex;
  width: 380px;
  height: 48px;
  justify-content: center;
  align-items: center;
  gap: 204px;
`;

const SNSDiv = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 36px;
`;
const SNSButton = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const JoinButton = styled.div`
  display: flex;
  width: 380px;
  height: 40px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #999;
  color: #fff;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 123.5%; /* 29.64px */
  letter-spacing: 0.25px;
`;

export default Login;