import axios from 'axios';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { UserAtom } from '../../../recoil/UserAtom';

type ChangePasswordModalProps = {
  pw?: string;
};

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ pw }) => {
  const [user, setUser] = useRecoilState(UserAtom);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const joinMutation = useMutation(
    // (userData: typeof user) =>
    (userData) =>
      axios.post(`${process.env.REACT_APP_SERVER_URL!}/auth/join`, userData),
    {
      onSuccess: () => {
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

  const onSubmitJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // joinMutation.mutate(user);
  };

  const handleChangePassword = () => {
    if (pw !== password) {
      alert('현재 비밀번호를 확인 해 주세요.');
      return;
    }
    if (pw === newPassword) {
      alert('현재 비밀번호와 변경 비밀번호가 같습니다.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('확인 비밀번호가 틀립니다.');
      return;
    }
  };

  return (
    <Container onSubmit={handleChangePassword}>
      <Group>
        <Label>현재 비밀번호</Label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Group>
      <Group>
        <Label>변경 비밀번호</Label>
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
      </Group>
      <Group>
        <Label>변경 비밀번호 확인</Label>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </Group>
      <button type="submit">비밀번호 수정</button>
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
`;

const Label = styled.div``;
export default ChangePasswordModal;
