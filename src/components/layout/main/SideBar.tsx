import React, { useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { hobby, home, logo, study, mypage, profile, myRecord } from '../../../images';
import { Link, NavLink } from 'react-router-dom';
import { getCookie, setTokenCookie } from '../../../auth/cookie';

type SideBarProps = {};

const navItems = [
  {
    title: '홈',
    icon: home,
    url: '/',
  },
  {
    title: '스터디룸',
    icon: study,
    url: 'room',
  },
  {
    title: '취미룸',
    icon: hobby,
    url: 'room',
  },
  {
    title: '책상 기록',
    icon: myRecord,
    url: '/myrecord',
  },
];

const SideBar: React.FC<SideBarProps> = () => {
  const token = getCookie('token');

  return (
    <Sidebar>
      <GlobalStyle />
      <SidebarInner>
        <SidebarHeader>
          <Logo src={logo}></Logo>
        </SidebarHeader>
        <SidebarMenu>
          {navItems.map(item => (
            <SidebarButton to={item.url}>
              <img src={item.icon} />

              <p>{item.title}</p>
            </SidebarButton>
          ))}
        </SidebarMenu>
          {token ? (
            <User to="/mypage/:id">
              <img></img>
              <p>{}</p>
            </User>
          ) : (
            <User to="/login">
              <img></img>
              <p>
                로그인이 <br /> 필요합니다.
              </p>
            </User>
          )}
      </SidebarInner>
    </Sidebar>
  );
};

const SidebarButton = styled(NavLink)`
  display: flex;
  align-items: center;
  height: 60px;
  width: 60px;
  background-color: transparent; // 기본 배경색을 투명으로 설정
  transition: width 0.4s, background-color 0.3s; // width와 background-color에 대한 transition 추가

  font-size: 16px;
  text-transform: capitalize;
  line-height: 1;
  border-radius: 60px;
  opacity: 0.8;

  &.active {
    > img {
      opacity: 1;
    }
    
  }

  &:hover {
    background-color: #d9d9d9;
    opacity: 1;
    width: 100%;
    > img {
      opacity: 1;
    }
  }

  > img {
    opacity: 0.3;
    border-radius: 50%;
    margin: 0 18px 0 15px;
  }

  > p {
    width: 100px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
  }
`;

const User = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;

  margin: auto 0 130px 15px;

  > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #d9d9d9;
    margin-right: 15px;
  }

  > p {
    font-size: 15px;
    width: 100px;
    line-height: 123.5%; /* 18.525px */
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
  }
`;

const SidebarMenu = styled.div`
  display: grid;
  padding: 10px;
  gap: 50px;
  margin-top: 50px;

  ${SidebarButton} img {
    transition: width 0.3s;
  }

  &:hover {
    width: 200px;

    ${SidebarButton} img {
      transition: 0.3s;
    }
  }
`;

const Logo = styled.img`
  height: 70px;
  padding: 10px;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72px;
  width: 80px;
`;

const SidebarInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;

const Sidebar = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 80px;
  height: 100%;
  background: #999;
  transition: width 0.4s;

  ${SidebarHeader} {
    transition: width 0.3s; // 이걸 추가해!
  }

  &:hover {
    width: 200px;

    ${SidebarHeader} {
      width: 200px;
    }

    ${SidebarButton} p, ${User} p {
      opacity: 1;
      /* transition: opacity 0.7s ease-in-out; */
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  } 

  body {
    margin: 0;
  }

  button {
    background: transparent;
    border : 0;
    padding: 0;
    cursor: pointer;
  }
`;

export default SideBar;
