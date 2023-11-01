import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';

import { getCookie } from '../../auth/cookie';
import { fetchUser } from '../../axios/api';

import ChangePasswordModal from './components/ChangePasswordModal';
import ConfirmModal from '../../components/ConfirmModal';
import EditProfileImg from './components/EditProfileImg';

import { profile } from '../../images';
import { logoColor } from '../../images';
import { kakao, google } from '../../images/main';

type MypageProps = {};

const Mypage: React.FC<MypageProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNick, setIsOpenNick] = useState(false);
  const [isOpenLogout, setIsOpenLogout] = useState(false);
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [nickname, setNickname] = useState('');

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const token = getCookie('token');

  const handleLogout = () => {
    setIsOpenLogout(!isOpenLogout);
  };

  const handleDeleteUser = () => {
    setIsOpenDeleteUser(!isOpenDeleteUser);
  };

  const { data, refetch } = useQuery<user, Error>('mypageUser', fetchUser, {
    refetchOnWindowFocus: false,
  });

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
        refetch();
        setIsOpenNick(false);
        setErrorMessage('')
      },
      onError: (error: any) => {
        if (error.response) {
          const message = error.response.data.message;
          setErrorMessage(
            '닉네임은 2개 이상 5개 이하의 문자로 이루어져야 합니다.',
          );
        }
      },
    },
  );

  const onSubmitNickname = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedNickname = nickname.trim();
    if (!trimmedNickname) {
      alert('닉네임을 입력해주세요!');
      return;
    }

    joinMutation.mutate(nickname);
  };

  return (
    <Container>
      <Contants>
        <UserProfile>
          <ProfileImg
            src={data?.profileImage ? data?.profileImage : profile}
            alt="profile image"
          ></ProfileImg>
          <EditProfileImg />

          <UserInfo>
            <Group>
              <div>
                <Label>닉네임</Label>
                <EditButton onClick={() => setIsOpenNick(!isOpenNick)}>
                  닉네임 수정
                </EditButton>
              </div>

              {isOpenNick ? (
                <EditNickname onSubmit={onSubmitNickname}>
                  <input
                    placeholder={data?.nickname}
                    value={nickname}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNickname(e.target.value)
                    }
                  />
                  <button type="submit">저장</button>
                </EditNickname>
              ) : (
                data?.nickname
              )}
              {errorMessage && <Error>{errorMessage}</Error>}
            </Group>
            {isOpen && <ChangePasswordModal />}
            <EmailInfo
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Group>
                <Label>이메일 계정 </Label>
                <span>{data?.email ? data?.email : 'abcd@email.com'}</span>
              </Group>
              <img
                src={
                  data?.provider === 'local'
                    ? logoColor
                    : data?.provider === 'Kakao'
                    ? kakao
                    : google
                }
                alt="login-info"
              />
              <EmailHover show={isHovered}>
                {data?.provider === 'local'
                  ? '일반로그인 '
                  : data?.provider === 'Kakao'
                  ? '카카오로그인 '
                  : '구글로그인 '}
                입니다.
              </EmailHover>
            </EmailInfo>
          </UserInfo>
        </UserProfile>

        <Lists>
          <List onClick={() => setIsOpen(!isOpen)}>정보수정</List>
          <List onClick={handleLogout}>로그아웃</List>
          <List onClick={handleDeleteUser}>회원탈퇴</List>
        </Lists>
        {isOpenLogout && (
          <ConfirmModal title="로그아웃" setIsOpen={setIsOpenLogout} />
        )}
        {isOpenDeleteUser && (
          <ConfirmModal title="회원탈퇴" setIsOpen={setIsOpenDeleteUser} />
        )}
      </Contants>

      {/* <GoalRecordChart /> */}
    </Container>
  );
};

const Error = styled.div`
  color: red;
  margin-top: 5px;
`

const EditButton = styled.button`
  color: var(--primary-01);
`;

const EmailHover = styled.div<{ show: boolean }>`
  position: absolute;
  top: 15px;
  right: 200px;
  font-size: 12px;
  font-weight: 500;
  background-color: white;
  border-radius: 15px;
  padding: 3px 10px;
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out 0.3s;
`;

const EmailInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  > img {
    height: 30px;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;

  > span {
    font-size: 15px;
  }

  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
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

  > input {
    background-color: #e8f1ff;
  }

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

const Label = styled.span`
  margin-bottom: 5px;
  color: var(--gray-07);
  font-size: 14px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-top: 50px;
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
