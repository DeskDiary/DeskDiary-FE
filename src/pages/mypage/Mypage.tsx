import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import MainTop from '../../components/MainTop';
import { profile } from '../../images';
import { down, right } from '../../images/mypage';
import { UserAtom, ProfiltUpdate } from '../../recoil/UserAtom';

import { useQuery } from 'react-query';

import { getCookie } from '../../auth/cookie';
import { fetchUser } from '../../axios/api';
import { RoomAtom } from '../../recoil/RoomAtom';
import Profile from './components/Profile';
import MypageToggle from './components/MypageToggle';

type MypageProps = {};

const Mypage: React.FC<MypageProps> = () => {
  const token = getCookie('token');
  const [user, setUser] = useRecoilState(UserAtom);
  const [formData, setFormData] = useRecoilState(RoomAtom);
  const { data, error, isLoading } = useQuery<user, Error>('user', fetchUser);
  const [isOpen, setIsOpen] = useState(false);

  const [edit, setEdit] = useRecoilState(ProfiltUpdate);

  const lists = [
    { i: 1, title: '공지 사항', url: '/mypage', type: 'noPage' },
    { i: 2, title: '서비스 이용 약관', url: '/mypage', type: 'noPage' },
    { i: 3, title: '자주 묻는 질문', url: '/mypage', type: 'noPage' },
    { i: 4, title: '계정 관리', url: '/mypage', type: '계정관리' },
    { i: 5, title: '로그아웃', url: '/mypage', type: '로그아웃' },
    { i: 6, title: '환경 설정', url: '/mypage', type: 'noPage' },
  ];

  const onClickToggle = () => {
    setIsOpen(!isOpen);
  };

  const onClickList = (type: string) => {
    alert(type);
  };

  return (
    <Container col justify="start">
      <MainTop />
      <Contants col justify="start">
        <UserProfile col justify="start">
          <ProfileImg
            src={data?.profileImage ? data?.profileImage : profile}
            alt="profile image"
          ></ProfileImg>
          {edit.open && <Profile />}

          <UserInfo col>
            <Label>닉네임</Label>
            <Content>{data?.nickname}</Content>
            {edit.open && (
              <EditNickname>
                <input />
                <button>닉네임 저장</button>
              </EditNickname>
            )}
          </UserInfo>
        </UserProfile>
        <Toggle justify="start" onClick={onClickToggle}>
          <img src={isOpen ? down : right} alt="toggle" />
          <span>계정관리</span>
        </Toggle>
        {isOpen && <MypageToggle />}
        <Lists col>
          {lists.map(list => {
            return (
              <List onClick={() => onClickList(list.type)}>{list.title}</List>
            );
          })}
        </Lists>
      </Contants>

      {/* <GoalRecordChart /> */}
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

const EditNickname = styled(FlexContainer)`
  width: 100%;

`

const Toggle = styled(FlexContainer)`
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

const Lists = styled(FlexContainer)`
  /* margin-top: 70px; */
`;

const Content = styled.div``;

const Label = styled.div``;

const UserInfo = styled(FlexContainer)`
width: 100%`;

const ProfileImg = styled.img`
  width: 170px;
  height: 170px;
  /* background: url(${profile}) no-repeat center; */
`;

const UserProfile = styled(FlexContainer)`
  width: 800px;
  margin-top: 70px;
`;

const Contants = styled(FlexContainer)`
  width: 800px;
`;

const Container = styled(FlexContainer)`
  width: 70%;
  height: 100vh;
`;
export default Mypage;
