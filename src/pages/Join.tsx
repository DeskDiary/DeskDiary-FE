import React, { useState } from 'react';
import styled from '@emotion/styled';
import { toast } from 'sonner';
import { useRecoilState } from 'recoil';
import { userAtom } from '../recoil/UserAtom';
import axios from 'axios';
import {
  validateEmail,
  validatePassword,
  validateNickname,
} from '../utils/validation';

type JoinProps = {};

const Join: React.FC<JoinProps> = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [confitmPassword, setConfirmPassword] = useState('');

  const onSubmitJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유효성 검사
    // 이메일 유효성 검사
    if (!validateEmail(user.email)) {
      console.log('Email validation failed.');
      toast.error('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    // 비밀번호 유효성 검사
    if (!validatePassword(user.password)) {
      toast.error(
        '비밀번호는 영문 + 숫자 + 특수기호 포함 6글자 이상 20글자 이내로 작성해주세요.',
      );
      return;
    }

    // 비밀번호 확인
    if (confitmPassword !== user.password) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 닉네임 유효성 검사
    if (!validateNickname(user.nickname)) {
      console.log('Nickname validation failed.');
      toast.error(
        '닉네임은 문자로 이루어진 2~8글자로 설정해주세요.',
      );
      return;
    }

    try {
      await axios.post('http://localhost:4000/users', user);
      toast.success('회원가입 성공!');
      setUser({ email: '', password: '', nickname: '' }); // 초기화
    } catch (error) {
      toast.error('회원가입 실패!');
    }
  };

  return (
    <JoinForm onSubmit={onSubmitJoin}>
      <JoinContainer>
        <Title>JOIN</Title>
        <JoinList gap="20px">
          <Joincontent align="start">
            <JoinLabel>이메일</JoinLabel>
            <JoinInput
              type="email"
              placeholder="이메일 입력 해 주세요"
              onChange={e => setUser({ ...user, email: e.target.value })}
            />
          </Joincontent>

          <Joincontent align="start">
            <JoinLabel>비밀번호</JoinLabel>
            <JoinInput
              type="password"
              placeholder="비밀번호를 입력 해 주세요"
              onChange={e => setUser({ ...user, password: e.target.value })}
            />
          </Joincontent>

          <Joincontent align="start">
            <JoinLabel>비밀번호 확인</JoinLabel>
            <JoinInput
              type="password"
              placeholder="비밀번호를 한 번 더 입력해주세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
          </Joincontent>

          <Joincontent align="start">
            <JoinLabel>닉네임</JoinLabel>
            <JoinInput
              type="text"
              placeholder="닉네임를 입력 해 주세요"
              onChange={e => setUser({ ...user, nickname: e.target.value })}
            />
          </Joincontent>
        </JoinList>
      </JoinContainer>
      <button type="submit">회원가입</button>
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

const JoinForm = styled.form`
  display: flex-direction;
  flex-direction: column;
  align-items: center;
`

const Joincontent = styled(FlexContainer)``;

const JoinInput = styled.input`
  width: calc(100% - 20px);
  height: 40px;
  border-radius: 0%;
  border: 1.5px solid black;
  padding: 0 10px;
  font-size: 15px;

  &:focus {
    outline: 1.5px solid greenyellow;
    border: none;
  }
`;

const JoinLabel = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const JoinList = styled(FlexContainer)`
  margin-top: 30px;
`;

const JoinContainer = styled(FlexContainer)`
  margin-top: 50px;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

export default Join;
