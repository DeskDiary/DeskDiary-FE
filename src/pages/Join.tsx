import React, { useState } from 'react';
import styled from '@emotion/styled';
import { toast } from 'sonner';
import { useRecoilState } from 'recoil';
import { userAtom } from '../recoil/UserAtom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import checked from '../images/Radiobutton.png'

type JoinProps = {};

const Join: React.FC<JoinProps> = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [confitmPassword, setConfitmPassword] = useState('');
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [matchPasswordError, setMatchPasswordError] = useState<string | null>(
    null,
  );

  const onClickAgree = () => {
    setIsAgreeChecked(!isAgreeChecked)
    
  }

  const blurConfirmHandler = async () => {
    if (confitmPassword !== user.password) {
      setMatchPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setMatchPasswordError(null);
    }
    return;
  };

  const onSubmitJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_SERVER_URL!}/auth/join`, user)
      .then(response => {
        alert('회원가입 성공');
      })
      .catch(error => {
        if (error.response) {
          const message = error.response.data.message;
          console.log(message);
          if (message.includes('이메일이 이미')) {
            setEmailError('이메일이 이미 사용중입니다.');
          }

          if (message.includes('이메일이 형식이')) {
            setEmailError('이메일 형식이 아닙니다');
            console.log(message);
          }

          if (message.includes('이메일이 비어')) {
            setEmailError('이메일이 비어 있으면 안됩니다.');
          }

          if (message.includes('닉네임이 비어 있으면 안됩니다.')) {
            setNicknameError('닉네임이 비어 있으면 안됩니다.');
          }

          if (
            message.includes('닉네임은 한글, 알파벳, 숫자만 포함해야 합니다')
          ) {
            setNicknameError('닉네임은 특수문자가 포함될 수 없습니다.');
          }

          if (message.includes('비밀번호가 비어 있으면 안됩니다.')) {
            setPasswordError('비밀번호가 비어 있으면 안됩니다.');
          }

          if (
            message.includes(
              '비밀번호는 대문자, 소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다',
            )
          ) {
            setPasswordError(
              '비밀번호는 대문자, 소문자, 숫자, 특수문자를 각각 하나 이상 포함한 8자 이상 이어야 합니다',
            );
          }

          if (message.includes('비밀번호는 8자 이상이어야 합니다')) {
            setPasswordError('비밀번호는 8자 이상이어야 합니다');
          }

          return '회원가입에 실패햇습니다. 관리자에게 문의해주세요.';
        }
      });
  };

  return (
    <JoinForm onSubmit={onSubmitJoin}>
      <JoinContainer>
        <Title>회원가입</Title>
        <JoinList align="start">
          <Joincontent align="start">
            <JoinLabel>이메일</JoinLabel>
            <JoinInput
              type="text"
              placeholder="예시 ) deskdiary@deskdiary.com"
              onChange={e => setUser({ ...user, email: e.target.value })}
              onBlur={() => setEmailError(null)}
            />
            <Relative>
              {emailError ? <ErrorMessage>{emailError}</ErrorMessage> : null}
            </Relative>
          </Joincontent>

          <Joincontent align="start">
            <JoinLabel>비밀번호</JoinLabel>
            <JoinInput
              type="password"
              placeholder="영어 대소문자,숫자,특수문자 포함 8~16자"
              onChange={e => setUser({ ...user, password: e.target.value })}
              onBlur={() => setPasswordError(null)}
            />
            <Relative>
              {passwordError ? (
                <ErrorMessage>{passwordError}</ErrorMessage>
              ) : null}
            </Relative>
          </Joincontent>

          <Joincontent align="start">
            <JoinLabel>비밀번호 확인</JoinLabel>
            <JoinInput
              type="password"
              placeholder="비밀번호를 한 번 더 입력해주세요"
              onChange={e => setConfitmPassword(e.target.value)}
              onBlur={blurConfirmHandler}
            />
            <Relative>
              {matchPasswordError ? (
                <ErrorMessage>{matchPasswordError}</ErrorMessage>
              ) : null}
            </Relative>
          </Joincontent>

          <Joincontent align="start">
            <JoinLabel>닉네임</JoinLabel>
            <JoinInput
              type="text"
              placeholder="4~12자"
              onChange={e => setUser({ ...user, nickname: e.target.value })}
              onBlur={() => setNicknameError(null)}
            />
            <Relative>
              {nicknameError ? (
                <ErrorMessage>{nicknameError}</ErrorMessage>
              ) : null}
            </Relative>
          </Joincontent>

          <AgreeBox row justify="start">
            <AgreeCheck type="checkbox" onClick={onClickAgree}></AgreeCheck>
            <AgreeLink to="/">개인정보 이용 동의 체크체크체크체크</AgreeLink>
          </AgreeBox>
        </JoinList>
      </JoinContainer>
      <JoinButton type="submit" disabled={!isAgreeChecked}>JOIN</JoinButton>
      <SocialLoginText>SNS 계정으로 시작하기</SocialLoginText>
      <SocialLoginGroup row gap="30px">
        <SocialLoginLink to="/">카카오</SocialLoginLink>
        <SocialLoginLink to="/">구글</SocialLoginLink>
      </SocialLoginGroup>
    </JoinForm>
  );
};

const FlexContainer = styled.div<{
  row?: boolean;
  align?: string;
  justify?: string;
  gap?: string;
}>`
  display: flex;
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  align-items: ${props => (props.align ? props.align : 'center')};
  justify-content: ${props => (props.justify ? props.justify : 'center')};
  gap: ${props => props.gap || '0'};
  width: 300px;
`;

const ErrorMessage = styled.div`
  width: 400px;
  padding: 10px;
  color: var(--system-error, #d32f2f);
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 123.5%; /* 18.525px */
  letter-spacing: 0.25px;

  top: 85px;
`;

const AgreeBox = styled(FlexContainer)`
  height: 48px;
`;

const SocialLoginLink = styled(Link)`
  width: 72px;
  height: 72px;
  background-color: #999;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 130px;
`;

const SocialLoginText = styled(FlexContainer)`
  margin-top: 40px;
  height: 48px;
`;

const SocialLoginGroup = styled(FlexContainer)``;

const JoinButton = styled.button<{ disabled: boolean }>`
  width: 400px;
  height: 60px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  /* background-color: rgba(153, 153, 153, 0.5); */
  border: none;
  margin-top: 12px;
  color: #fff;
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 123.5%; /* 29.64px */
  letter-spacing: 0.25px;

  background-color: rgba(153, 153, 153, ${props => (props.disabled ? '0.5' : '1.0')});
  cursor: ${props => (props.disabled ? '' : 'pointer')};
`;

const AgreeLink = styled(Link)`
  color: #000;
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 123.5%; /* 18.525px */
  letter-spacing: 0.25px;
`;

const AgreeCheck = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #9e9e9e;
  display: inline-block;
  margin: 0 8px 0 0;
  //체크했을 때의 스타일
  &:checked {
    background: url(${checked}) no-repeat center;
  }
`;

const JoinForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 582px;
  background: rgba(237, 237, 237, 0.5);
  height: 100%;
`;

const Joincontent = styled(FlexContainer)``;

const Relative = styled.div`
  height: 40px;
`;

const JoinInput = styled.input`
  width: 368px;
  height: 26px;
  border-radius: 5px;
  border: 1px solid var(--gray-07, #757575);
  background: #fff;
  padding: 10px 15px;
  font-size: 15px;

  &:focus {
    outline-color: #00C5FF;
  }
`;

const JoinLabel = styled.div`
  width: 380px;
  padding: 10px;
  color: var(--gray-07, #757575);
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 123.5%; /* 18.525px */
  letter-spacing: 0.25px;
`;

const JoinList = styled(FlexContainer)`
  margin-top: 12px;
  width: 100%;
`;

const JoinContainer = styled(FlexContainer)`
  width: 400px;
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.25px;
  width: 100%;
  margin-top: 108px;
`;

export default Join;