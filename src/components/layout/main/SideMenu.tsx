import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

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
          <LogoImg src="/images/Logo.png" />
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
  width: 224px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
`;

const Logo = styled(FlexContainer)`
  width: 100%;
  height: 56px;
`;

const LogoImg = styled.img`
  width: 136px;
  margin: 0 auto;
`;

export default SideMenu;
