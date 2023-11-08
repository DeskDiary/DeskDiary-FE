import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { getCookie, setTokenCookie, setRefreshTokenCookie } from '../../auth/cookie';
import { google } from '../../images/main';
import {
  logo_colorful,
  x,
  radio_button_checked,
  radio_button_unchecked,
} from '../../images';
import { Link } from 'react-router-dom';
import Kakao from './components/Kakao';
import Google from './components/Google';
import { toast } from 'sonner';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  useEffect(() => {
    document.title = '책상일기 - 로그인'
  }, []);
  const navigate = useNavigate();
  const token = getCookie('token');
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [idSaveCheckButton, setIdSaveCheckButton] = useState<boolean>(false);
  useEffect(() => {
    if (token) {
      toast.error('이미 로그인이 되어있습니다.');
      navigate(-1);
    }
  }, [token, navigate]);
  const getSavedIdFromLocalStorage = () => {
    const getId = localStorage.getItem('아이디저장');
    console.log(getId)
    return getId ? atob(getId) : '';
  };
  useEffect(() => {
    const getId = getSavedIdFromLocalStorage();
    console.log(getId)
    if (getId) {
      setId(getId);
      setIdSaveCheckButton(true);
    }
  }, []);

  const [errorMessage, setErrorMessage] = useState<any[]>([]);
  const [showErrorMessage, setShowErrorMessage] = useState('');

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const loginMutation = useMutation(async (formData: FormData) => {
    try {
      const url = `${serverUrl}/auth/login`;
      const requestBody = {
        email: formData.get('email'),
        password: formData.get('password'),
      };

      const response = await axios.post(url, requestBody);
      console.log('🤗🤗🤗🤗',response);
      const token = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      setErrorMessage([]);
      setTokenCookie(token);
      setRefreshTokenCookie(refreshToken);
      if (idSaveCheckButton === true) {
        saveIdLocalStorage(id);
      }
      navigate('/');
    } catch (error: any) {
      if (error.response) {
        setShowErrorMessage('* 이메일 혹은 비밀번호를 확인 해 주세요');
      } else if (
        error.response.message.includes('이메일 혹은') &&
        error.response.status === 400
      ) {
        setShowErrorMessage('* 이메일 혹은 비밀번호를 확인 해 주세요');
      }
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 이벤트의 기본 동작 ( 리렌더링 ) 차단
    const formData = new FormData(event.currentTarget);
    // form 내의 데이터를 읽어온다. name 속성을 키로 그 값들을 가지고 있다.
    // console.log({
    //   email: formData.get('email'),
    //   password: formData.get('password'),
    // });
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
    localStorage.setItem('아이디저장', btoa(id));
  };

  const handleCheckChange = () => {
    setIdSaveCheckButton(!idSaveCheckButton);
    if (idSaveCheckButton) {
      localStorage.removeItem('아이디저장');
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <Logo to="/"></Logo>
      <Title>로그인</Title>
      <InputDiv>
        <Ptag>ID</Ptag>
        <InputBox>
          <InputTag
            type="text"
            placeholder="이메일을 입력해주세요."
            name="email"
            value={id}
            onChange={idChangeHandler}
            autoComplete="off"
            required
          />
          {id.length !== 0 && (
            <img
              src={x}
              alt="clear"
              onClick={() => {
                inputClear('id');
              }}
            />
          )}
        </InputBox>
        {/* <Ptag>등록되지 않은 이메일입니다.</Ptag> */}
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
            required
          />
          {pw.length !== 0 && (
            <img
              src={x}
              alt="clear"
              onClick={() => {
                inputClear('pw');
              }}
            />
          )}
        </InputBox>
        {showErrorMessage && <Error>{showErrorMessage}</Error>}
      </InputDiv>
      <IdSaveBox>
        <IdDiv>
          {idSaveCheckButton ? (
            <img
              src={radio_button_checked}
              alt=""
              onClick={handleCheckChange}
            />
          ) : (
            <img
              src={radio_button_unchecked}
              alt=""
              onClick={handleCheckChange}
            />
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
        {/* <SNSButton bgImg={카카오로그인}></SNSButton> */}
        <Kakao />
        <Google />
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

const Error = styled.div`
  width: 400px;
  padding: 5px 0 10px 5px;
  color: var(--system-error);
  font-size: 14px;
  font-weight: 400;

  color: red;
  margin-left: 10px;
  top: 85px;
`;

const Logo = styled(Link)`
  background: url(${logo_colorful}) no-repeat center;
  background-size: 60px;
  width: 62px;
  height: 73px;
`;

const LoginForm = styled.form`
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 70px;
`;

const Title = styled.div`
  width: 400px;
  text-align: center;
  font-size: 32px;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  margin-bottom: 20px;
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
  padding: 7px 10px;
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
  background: var(--primary-01);
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
  border: 1px solid var(--primary-01);
  background: var(--bw-whtie, #fefefe);
  cursor: pointer;
`;

export default Login;
