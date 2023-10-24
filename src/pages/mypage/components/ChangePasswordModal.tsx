import React, { useState } from 'react';
import styled from 'styled-components';

type ChangePasswordModalProps = {
  pw?: string;
};

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ pw }) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  console.log('password', password);
  console.log('newPassword', newPassword);
  console.log('confirmPassword', confirmPassword);

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
