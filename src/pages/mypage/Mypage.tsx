import styled from '@emotion/styled';
import React from 'react';
import MainTop from '../../components/MainTop';
import { profile } from '../../images';

type MypageProps = {};

const Mypage: React.FC<MypageProps> = () => {
  return (
    <Container column justify="start" align="center">
      <MainTop />
      <UserProfile column justify="start">
        <ProfileImg></ProfileImg>
        <UserInfo column>
          <Label>이메일</Label>
          <Content>seohyeon@email.com</Content>
          <Label>닉네임</Label>
          <Content>seohyeon</Content>
        </UserInfo>
      </UserProfile>
    </Container>
  );
};

const FlexContainer = styled.div<{
  column?: boolean;
  align?: string;
  justify?: string;
  gap?: string;
}>`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
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
  background-color: lightblue;
`;
export default Mypage;
