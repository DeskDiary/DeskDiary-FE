import styled from '@emotion/styled';
import React from 'react';
import MainTop from '../../components/MainTop';
import { profile } from '../../images';

import { useQuery } from 'react-query';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { RoomAtom } from '../../recoil/RoomAtom';

type MypageProps = {};

interface User {
  nickname: string,
  goaltime: number,
  image : string,
  }

const Mypage: React.FC<MypageProps> = () => {

  const fetchRooms = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL!}/auth/profile`,
    );
    console.log('유저데이터', data)
    return data;
  };

  const { data, error, isLoading } = useQuery<User, Error>(
    'user',
    fetchRooms,
  );

  return (
    <Container col justify="start" align="center">
      <MainTop />
      <UserProfile col justify="start">
        <ProfileImg></ProfileImg>
        <UserInfo col>
          {/* <Label>이메일{data?.email}</Label> */}
          <Content>seohyeon@email.com</Content>
          <Label>닉네임</Label>
          <Content>seohyeon{data?.nickname}</Content>
        </UserInfo>
      </UserProfile>
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

const Content = styled.div``;

const Label = styled.div``;

const UserInfo = styled(FlexContainer)``;

const ProfileImg = styled.div`
  width: 170px;
  height: 170px;
  background: url(${profile}) no-repeat center;
`;

const UserProfile = styled(FlexContainer)`
  width: 800px;
  background-color: aliceblue;
  margin-top: 70px;
`;

const Container = styled(FlexContainer)`
  width: 70%;
  height: 100vh;
`;
export default Mypage;
