import axios from 'axios';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { UserAtom } from '../../../recoil/UserAtom';
import { getCookie } from '../../../auth/cookie';

type ChangePasswordModalProps = {};

type UserData = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const token = getCookie('token');

  const joinMutation = useMutation(
    // (userData: typeof user) =>
    (userData: UserData) =>
      axios.put(`${process.env.REACT_APP_SERVER_URL!}/me/password`, userData, {
        headers: {
          Authorization: `Bearer ${token}`, // 여기서 토큰을 헤더에 추가해줘
        },
      }),

    {
      onSuccess: () => {
        setPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setErrorMessage('');
        alert('비밀번호 변경 완료');
      },
      onError: (error: any) => {
        if (error.response) {
          const message = error.response.data.message;
          console.log(message);

          switch (true) {
            case message.includes('비밀번호가 비어 있으면 안됩니다.'):
              setErrorMessage('비밀번호가 비어 있으면 안됩니다.');
              break;
            case message.includes(
              '비밀번호는 대문자, 소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다',
            ):
              setErrorMessage(
                '비밀번호는 대문자, 소문자, 숫자, 특수문자를 각각 하나 이상 포함한 8자 이상 이어야 합니다',
              );
              break;
            case message.includes('비밀번호는 8자 이상이어야 합니다'):
              setErrorMessage('비밀번호는 8자 이상이어야 합니다');
              break;
            default:
              console.log('회원가입에 실패했습니다. 관리자에게 문의해주세요.');
          }
        }
      },
    },
  );

  const onBlur = () => {
    setErrorMessage('');
  }

  const onSubmitChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(newPassword !== confirmNewPassword) {
      setErrorMessage('변경 비밀번호와 확인 비밀번호가 다릅니다.')
    }

    joinMutation.mutate({ password, newPassword, confirmNewPassword });
  };

  return (
    <Container onSubmit={onSubmitChange}>
      <Group>
        <Label>현재 비밀번호</Label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onBlur={onBlur}
        />
      </Group>
      <Group>
        <Label>변경 비밀번호</Label>
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          onBlur={onBlur}
        />
      </Group>
      <Group>
        <Label>변경 비밀번호 확인</Label>
        <input
          type="password"
          value={confirmNewPassword}
          onChange={e => setConfirmNewPassword(e.target.value)}
          onBlur={onBlur}
        />
      </Group>
      {errorMessage && errorMessage}
      <button type="submit">비밀번호 저장</button>
    </Container>
  );
};

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  > input {
    border: 1px solid var(--gray-07);
    width: 100%;
    height: 40px;
    padding: 10px;
    border-radius: 5px;
    font-size: 15px;
    &:focus {
      outline: none;
    }
  }
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  gap: 10px;
  margin-top: 20px;

  >button{
    margin-left: auto;
    color: var(--gray-07);
  }
`;

const Label = styled.div``;
export default ChangePasswordModal;
