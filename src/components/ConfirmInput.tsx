import React, { useState } from 'react';
import { toast } from 'sonner';
import styled from 'styled-components';

type ConfirmInputProps = {
  setIsDeleteUser:React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfirmInput: React.FC<ConfirmInputProps> = ({setIsDeleteUser}) => {
  const [inputText, setConfirm] = useState('');

  const confirmHandler = () => {
    if(inputText === '회원탈퇴') {
      setIsDeleteUser(false);
    } else {
      toast.error("공백 없이 '회원탈퇴' 를 올바르게 입력 해 주세요")
      setConfirm('')
    }
  }

  return (
    <Container>
      <p>
        회원탈퇴를 원하시면 아래에 <span>'회원탈퇴'</span>를<br />
        공백없이 올바르게 입력 해 주세요
      </p>
      <input
        type="text"
        value={inputText}
        onChange={e => setConfirm(e.target.value)}
      />
      <button onClick={confirmHandler}>입력 완료</button>
    </Container>
  );
};

const Container = styled.div`
  z-index: 5000;
  position: absolute;
  top: 90px;
  left: 50px;
  background-color: white;
  width: 300px;
  text-align: center;
  >p{
    font-size: 15px;
    color: var(--gray-07);
    >span{
      font-weight: 500;
    }

  }
  > input {
    width: 100%;
    height: 35px;
    padding: 10px;
    margin: 5px 0;
    border-radius: 10px;
    border: 1px solid var(--gray-05);
    &:focus {
      outline: none;
    }
  }

  >button{
    width: 100%;
    background-color: var(--primary-01);
    height: 40px;
    color: white;
    font-size: 17px;
    font-weight: 500;
    margin-top: 10px;
  }
`;

export default ConfirmInput;
