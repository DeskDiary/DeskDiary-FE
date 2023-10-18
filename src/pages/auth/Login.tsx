import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { getCookie, setTokenCookie } from '../../auth/cookie';
import XIcon from '../../images/Vector.svg';
import logo from '../../images/logo.png';
import 아이디저장o from '../../images/radio_button_checked.svg';
import 아이디저장x from '../../images/radio_button_unchecked.svg';
import 구글로그인 from '../../images/구글사진.svg';
import 카카오로그인 from '../../images/카카오사진.svg';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const token = getCookie('token');
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [idSaveCheckButton, setIdSaveCheckButton] = useState<boolean>(false);
  useEffect(() => {
    if (token) {
      alert('이미 로그인했습니다.');
      navigate(-1);
    }
  }, [token, navigate]);
  const getSavedIdFromLocalStorage = () => {
    const getId = localStorage.getItem('아이디저장');
    return getId ? getId : '';
  };
  useEffect(() => {
    const getId = getSavedIdFromLocalStorage();
    if (getId) {
      setId(getId);
      setIdSaveCheckButton(true);
    }
  }, []);

  const [errorMessage, setErrorMessage] = useState<any[]>([]);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const loginMutation = useMutation(async (formData: FormData) => {
    try {
      const url = `${serverUrl}/auth/login`;
      const requestBody = {
        email: formData.get('email'),
        password: formData.get('password'),
      };

      const response = await axios.post(url, requestBody);
      const token = response.headers.authorization.split(' ')[1];
      setErrorMessage([]);
      console.log(token);
      setTokenCookie(token);
      if (idSaveCheckButton) {
        saveIdLocalStorage(id);
      }
      alert(`로그인 성공`);
      navigate('/');
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      }
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

  const idChangeHandler = (e: any) => {
    setId(e.target.value);
  };
  const pwChangeHandler = (e: any) => {
    setPw(e.target.value);
  };

  const inputClear = (input: string) => {
    if (input === 'id') {
      setId('');
    } else if (input === 'pw') {
      setPw('');
    }
  };

  const saveIdLocalStorage = (id: string) => {
    localStorage.setItem('아이디저장', id);
  };

  const handleCheckChange = () => {
    setIdSaveCheckButton(!idSaveCheckButton);
    if (idSaveCheckButton) {
      localStorage.removeItem('아이디저장');
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <img src={logo} alt="" />
      <Title>로그인</Title>
      <InputDiv>
        <Ptag>ID</Ptag>
        <InputBox>
          <InputTag
            type="email"
            placeholder="이메일을 입력해주세요."
            name="email"
            value={id}
            onChange={idChangeHandler}
            autoComplete="off"
          />
          {id.length !== 0 && (
            <img
              src={XIcon}
              alt="clear"
              onClick={() => {
                inputClear('id');
              }}
            />
          )}
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
            value={pw}
            onChange={pwChangeHandler}
          />
          {pw.length !== 0 && (
            <img
              src={XIcon}
              alt="clear"
              onClick={() => {
                inputClear('pw');
              }}
            />
          )}
        </InputBox>
        <Ptag>비밀번호를 확인해주세요.</Ptag>
      </InputDiv>
      <IdSaveBox>
        <IdDiv>
          {idSaveCheckButton ? (
            <img src={아이디저장o} alt="" onClick={handleCheckChange} />
          ) : (
            <img src={아이디저장x} alt="" onClick={handleCheckChange} />
          )}
          <p>아이디 저장</p>
        </IdDiv>
        <div>
          <p>비밀번호 찾기</p>
        </div>
      </IdSaveBox>
      <LogInButton type="submit">로그인</LogInButton>
      <Ptag2>SNS 계정으로 로그인</Ptag2>
      <SNSDiv>
        <SNSButton bgImg={카카오로그인}></SNSButton>
        <SNSButton bgImg={구글로그인}></SNSButton>
      </SNSDiv>
      <Ptag2>아직 회원이 아니신가요?</Ptag2>
      <JoinButton
        onClick={() => {
          navigate('/join');
        }}
      >
        회원가입
      </JoinButton>
    </LoginForm>
  );
};

const LoginForm = styled.form`
  width: 582px;
  height: calc(100vh - 76px);
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
  margin-top: 24px;
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
  border: 2px solid var(--gray-06, #9e9e9e);
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
  justify-content: space-between;
  height: 48px;

  width: 390px;
  white-space: nowrap;
`;

const IdDiv = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;

const LogInButton = styled.button`
  display: flex;
  width: 400px;
  height: 60px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border: none;
  gap: 10px;
  flex-shrink: 0;
  opacity: 0.5;
  background: var(--primary-01, #00c5ff);
  color: #fff;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px;
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
const SNSButton = styled.div<{ bgImg: string }>`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${props => props.bgImg || ' '});
`;

const JoinButton = styled.div`
  display: flex;
  width: 380px;
  height: 40px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: var(--primary-01, #00c5ff);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 123.5%; /* 29.64px */
  letter-spacing: 0.25px;
  border: 1px solid var(--primary-01, #00c5ff);
  background: var(--bw-whtie, #fefefe);
`;

export default Login;
