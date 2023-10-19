import styled from '@emotion/styled';
import React from 'react';
import MainTop from '../../components/MainTop';
import { profile } from '../../images';

import { useQuery } from 'react-query';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { RoomAtom } from '../../recoil/RoomAtom';
import {fetchUser} from '../../axios/api'

type MypageProps = {};


const Mypage: React.FC<MypageProps> = () => {


  const { data, error, isLoading } = useQuery<user, Error>('user', fetchUser);


  return (
    <Container col justify="start" align="center">
      <MainTop />
      <UserProfile col justify="start">
        <ProfileImg src={data?.profileImage ? data?.profileImage : profile}></ProfileImg>
        <UserInfo col>
          <Label>닉네임</Label>
          <Content>{data?.nickname}</Content>
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

const ProfileImg = styled.img`
  width: 170px;
  height: 170px;
  /* background: url(${profile}) no-repeat center; */
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
