import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import MainTop from '../../components/layout/main/MainTop';
import { profile } from '../../images';
import { down, right } from '../../images/mypage';
import { UserAtom, ProfiltUpdate } from '../../recoil/UserAtom';

import { useQuery } from 'react-query';

import { getCookie } from '../../auth/cookie';
import { fetchUser } from '../../axios/api';
import { RoomAtom } from '../../recoil/RoomAtom';
import MypageToggle from './components/MypageToggle';
import EditProfileImg from './components/EditProfileImg';
import { useNavigate } from 'react-router';

type MypageProps = {};

const Mypage: React.FC<MypageProps> = () => {
  const token = getCookie('token');
  const [user, setUser] = useRecoilState(UserAtom);
  const [formData, setFormData] = useRecoilState(RoomAtom);
  const { data, error, isLoading } = useQuery<user, Error>('user', fetchUser);
  const [isOpen, setIsOpen] = useState(false);

  const [edit, setEdit] = useRecoilState(ProfiltUpdate);

  const navigate = useNavigate();

  const lists = [
    { i: 1, title: '가입정보', url: '/mypage', type: 'noPage' },
    { i: 2, title: '로그아웃', url: '/mypage', type: 'handleLogout' },
    { i: 3, title: '회원탈퇴', url: '/mypage', type: 'noPage' },
  ];

  const onClickToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // 토큰 이름이 'token'이라고 가정
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // 여기서 추가로 로그아웃 처리 로직을 넣을 수 있어. 예를 들면 페이지 리디렉션 같은 것!
    navigate('/');
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
            <Label>닉네임</Label>
            <Content>{data?.nickname}</Content>
            <EditNickname>
              <input />
              <button>닉네임 저장</button>
            </EditNickname>
          </UserInfo>
        </UserProfile>
        <Toggle onClick={onClickToggle}>
          <img src={isOpen ? down : right} alt="toggle" />
          <span>계정관리</span>
        </Toggle>
        {isOpen && <MypageToggle />}
        <Lists>
          <List onClick={() => handleLogout()}>로그아웃</List>
        </Lists>
      </Contants>

      {/* <GoalRecordChart /> */}
    </Container>
  );
};


const EditNickname = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;

  width: 100%;
`;

const Toggle = styled.div`
display: flex;
flex-direction: column;
justify-content: start;
align-items: center;

  width: 100%;
  margin-right: auto;
  background: url();
  margin-top: 70px;
  > img {
    margin-right: 5px;
  }
`;

const List = styled.div`
  width: 100%;
  margin-right: auto;
  font-size: 18px;
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
`;

const Content = styled.div``;

const Label = styled.div``;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const ProfileImg = styled.img`
  width: 170px;
  height: 170px;
  /* background: url(${profile}) no-repeat center; */
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 800px;
  margin-top: 70px;
`;

const Contants = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 800px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 70%;
  height: 100vh;
`;
export default Mypage;
