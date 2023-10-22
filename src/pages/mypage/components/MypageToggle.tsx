import React from 'react';
import styled from 'styled-components';
import { ProfiltUpdate } from '../../../recoil/UserAtom';
import { useRecoilState } from 'recoil';

type MypageToggleProps = {};

const MypageToggle: React.FC<MypageToggleProps> = () => {

  const [edit, setEdit] = useRecoilState(ProfiltUpdate);

  const onClickEdicProfile = () => {
    console.log(edit.open)
    setEdit(prevEdit => ({...prevEdit, open: true}))
  }

  const onClickLogout = () => {
    alert('로그아웃')
  }

  console.log(edit.open)

  const DeleteUser = () => {
    alert('회원탈퇴')
  }

  return (
    <Container col align='start'>
      <p onClick={onClickEdicProfile}>닉네임 수정</p>
      <p onClick={onClickLogout}>로그아웃</p>
      <p onClick={DeleteUser}>회원탈퇴</p>
    </Container>
  );
};

const FlexContainer = styled.div<{
  col?: boolean;
  align?: string;
  justify?: string;
  gap?: string;
}>`
  display: flex;
  flex-direction: ${props => (props.col ? 'column' : 'row')};
  align-items: ${props => (props.align ? props.align : 'center')};
  justify-content: ${props => (props.justify ? props.justify : 'center')};
  gap: ${props => props.gap || '0'};
  width: 100%;
`;

const Container = styled(FlexContainer)`
  width: 100%;
  margin-top: 10px;
  margin-left: 30px;
  
  >p{
    margin: 5px 0;
    cursor: pointer;
    color: var(--gray-06);
    &:hover{
      border-bottom: 1px solid var(--gray-07); 
      color: var(--gray-07);
    }
  }
`
export default MypageToggle;
