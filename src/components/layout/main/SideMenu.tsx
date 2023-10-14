import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../images/logo.png';
import profile from '../../../images/profile.png';

const SideMenu = () => {
  const menus2 = [
    {
      title: 'Main Home',
      url: 'home',
    },
    {
      title: '스터디룸',
      url: 'room',
    },
    {
      title: '취미룸',
      url: 'room',
    },
    {
      title: '마이페이지',
      url: 'mypage',
    },
  ];
  return (
    <Container column justify="start">
      <Logo>
        <Link to="/">
          <LogoImg src={logo} />
        </Link>
      </Logo>
      {menus2.map((menu, index) => {
        return (
          <MenuBox key={index} column align="start" justify="start">
            <MenuList justify="start">
              <MenuIcon></MenuIcon>
              <MenuTitle to={`/${menu.url}`}>{menu.title}</MenuTitle>
            </MenuList>
          </MenuBox>
        );
      })}
      <UserBar justify="start">
        <Profile src={profile} />
        <UserName>user 1</UserName>
      </UserBar>
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
`;

const UserName = styled.div`
  width: 128px;
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 123.5%; /* 18.525px */
  letter-spacing: 0.25px;
`;
const Profile = styled.img`
  width: 66px;
  height: 66px;
  flex-shrink: 0;
  margin-left: 14px;
`;

const UserBar = styled(FlexContainer)`
  height: 66px;
  margin-top: auto;
  margin-bottom: 144px;
`;

const MenuList = styled(FlexContainer)`
  padding: 11px 0;
  width: 100%;
`;

const MenuIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #d9d9d9;
  margin-left: 12px;
  margin-right: 24px;
`;

const MenuTitle = styled(NavLink)`
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 123.5%; /* 18.525px */
  letter-spacing: 0.25px;

  &[aria-current] {
    font-weight: bold;
    border-bottom: 2px solid black;
  }
`;

const MenuBox = styled(FlexContainer)`
  width: 200px;
  background-color: #ababab;
`;

const Container = styled(FlexContainer)`
  background-color: #999;
  width: 200px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
`;

const Logo = styled(FlexContainer)`
  width: 100%;
  height: 56px;
  margin-bottom: 342px;
  margin-top: 20px;
`;

const LogoImg = styled.img`
  width: 136px;
  margin: 0 auto;
`;

export default SideMenu;
