import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import MainTop from '../../components/layout/main/MainTop';
import { profile } from '../../images';
import { down, right } from '../../images/mypage';
import { UserAtom, ProfiltUpdate } from '../../recoil/UserAtom';
import send from '../../images/send.svg';

import { useQuery } from 'react-query';

import { getCookie } from '../../auth/cookie';
import { fetchUser } from '../../axios/api';
import { RoomAtom } from '../../recoil/RoomAtom';
import MypageToggle from './components/MypageToggle';
import EditProfileImg from './components/EditProfileImg';
import { useNavigate } from 'react-router';
import ChangePasswordModal from './components/ChangePasswordModal';
import LogoutModal from './components/LogoutModal';

type MypageProps = {};

const Mypage: React.FC<MypageProps> = () => {
  const token = getCookie('token');
  const [user, setUser] = useRecoilState(UserAtom);
  const [formData, setFormData] = useRecoilState(RoomAtom);
  const { data, error, isLoading } = useQuery<user, Error>('user', fetchUser);
  const [isOpen, setIsOpen] = useState(false);
  const [isChangePW, setIsChangePW] = useState(false);
  const [isOpenLogout, setIsOpenLogout] = useState(false);

  const navigate = useNavigate();

  const onClickToggle = () => {
    setIsOpen(!isOpen);
  };

  console.log('유저정보', data);

  const handleAuthInfo = () => {
    alert(`${data?.nickname} 님의 가입 경로는 ${data?.provider}입니다.`);
  };

  const handleLogout = () => {
    setIsOpenLogout(!isOpenLogout);
  };

  const handleChangePassword = () => {
    setIsChangePW(!isChangePW);
  };

  return (
    <Container>
      <MainTop />
      <Contants>
        <UserProfile>
          <ProfileImg
            src={data?.profileImage ? data?.profileImage : profile}
            alt="profile image"
          ></ProfileImg>
          <EditProfileImg />

          <UserInfo>
            <Group>
              <Label>닉네임</Label>
              <EditNickname>
                <input placeholder={data?.nickname} />
                <button>
                  <img src={send} alt="send" />
                </button>
              </EditNickname>
            </Group>
            <Group>
              <Label>이메일 계정</Label>
              <span>{data?.email ? data?.email : 'abcd@email.com'}</span>
            </Group>
            <ChangePasswordModal pw={data?.password}/>
          </UserInfo>
        </UserProfile>

        <Lists>
          <List onClick={() => onClickToggle()}>가입정보</List>
          {isOpen && (
            <Toggle>
              <span>
                {' '}
                {data?.nickname}님의 가입 경로 | {data?.provider}
              </span>
              <button onClick={handleChangePassword}> 비밀번호 수정</button>
            </Toggle>
          )}
          {isChangePW && <ChangePasswordModal />}
          <List onClick={handleLogout}>로그아웃</List>
          <List onClick={() => handleLogout()}>회원탈퇴</List>
        </Lists>
        {isOpenLogout && <LogoutModal setIsOpenLogout={setIsOpenLogout}/>}
      </Contants>

      {/* <GoalRecordChart /> */}
    </Container>
  );
};

const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;

  > span {
    font-size: 15px;
  }
`;

const EditNickname = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  border: 1px solid var(--gray-07);
  padding: 5px;
  border-radius: 5px;

  width: 100%;
  > input {
    width: 100%;
    height: 30px;
    border: none;
    &:focus {
      outline: none;
    }
  }

  > button {
    width: 30px;
    > img {
      filter: grayscale(100%);
      &:hover {
        filter: grayscale(0%);
      }
    }
  }
`;

const Toggle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  width: 100%;
  margin-right: auto;
  font-size: 18px;
`;

const List = styled.div`
  width: 100%;
  margin-right: auto;
  font-size: 18px;
  color: var(--gray-09);
  padding: 16px 0;
  border-top: 1px solid var(--gray-03);
  border-bottom: 1px solid var(--gray-03);
  cursor: pointer;
`;

const Lists = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Content = styled.div``;

const Label = styled.div`
  margin-bottom: 5px;
  color: var(--gray-07);
  font-size: 14px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 30px;

  width: 100%;

  margin-bottom: 60px;
`;

const ProfileImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 100%;
  margin-top: 70px;
`;

const Contants = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 400px;
  height: 100vh;
`;
export default Mypage;
