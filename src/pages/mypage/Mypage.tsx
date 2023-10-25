import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';

import { getCookie } from '../../auth/cookie';
import { fetchUser } from '../../axios/api';

import MainTop from '../../components/layout/main/MainTop';
import ChangePasswordModal from './components/ChangePasswordModal';
import ConfirmModal from '../../components/ConfirmModal';
import EditProfileImg from './components/EditProfileImg';

import { profile } from '../../images';
import send from '../../images/send.svg';

type MypageProps = {};

const Mypage: React.FC<MypageProps> = () => {
  const { data } = useQuery<user, Error>('mypageUser', fetchUser);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLogout, setIsOpenLogout] = useState(false);
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [nickname, setNickname] = useState('');

  const token = getCookie('token');

  const onClickToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsOpenLogout(!isOpenLogout);
  };

  const handleDeleteUser = () => {
    setIsOpenDeleteUser(!isOpenDeleteUser);
  };

  const joinMutation = useMutation(
    (nickname: string) =>
      axios.put(
        `${process.env.REACT_APP_SERVER_URL!}/me/profile`,
        { nickname: nickname },
        {
          headers: {
            Authorization: `Bearer ${token}`, // JWT 토큰을 여기에 삽입해주세요
          },
        },
      ),
    {
      onSuccess: () => {
        alert('닉네임 수정 성공');
        // navigate('/login');
      },
      onError: (error: any) => {
        if (error.response) {
          const message = error.response.data.message;
          console.log(message);

          switch (true) {
            case message.includes('닉네임이 비어 있으면 안됩니다.'):
              setErrorMessage('닉네임이 비어 있으면 안됩니다.');
              break;
            case message.includes(
              '닉네임은 한글, 알파벳, 숫자만 포함해야 합니다',
            ):
              setErrorMessage('닉네임은 특수문자가 포함될 수 없습니다.');
              break;
            default:
              console.log(
                '닉네임변경에 실패했습니다. 관리자에게 문의해주세요.',
              );
          }
        }
      },
    },
  );

  const onSubmitNickname = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('nickname', nickname);

    joinMutation.mutate(nickname);
  };

  console.log(nickname);

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
              <EditNickname onSubmit={onSubmitNickname}>
                <input
                  placeholder={data?.nickname}
                  value={nickname}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNickname(e.target.value)
                  }
                />
                <button type="submit">
                  <img src={send} alt="send" />
                </button>
              </EditNickname>
            </Group>
            <Group>
              <Label>이메일 계정</Label>
              <span>{data?.email ? data?.email : 'abcd@email.com'}</span>
            </Group>
            <ChangePasswordModal/>
          </UserInfo>
        </UserProfile>

        <Lists>
          {/* <List onClick={() => onClickToggle()}>가입정보</List>
          {isOpen && (
            <Toggle>
              <span>
                {' '}
                {data?.nickname}님의 가입 경로 | {data?.provider}
              </span>
              <button onClick={handleChangePassword}> 비밀번호 수정</button>
            </Toggle>
          )}
          {isChangePW && <ChangePasswordModal />} */}
          <List onClick={handleLogout}>로그아웃</List>
          <List onClick={handleDeleteUser}>회원탈퇴</List>
        </Lists>
        {isOpenLogout && <ConfirmModal title="로그아웃" setIsOpen={setIsOpenLogout} />}
        {isOpenDeleteUser && <ConfirmModal title="회원탈퇴" setIsOpen={setIsOpenDeleteUser} />}
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

const EditNickname = styled.form`
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
