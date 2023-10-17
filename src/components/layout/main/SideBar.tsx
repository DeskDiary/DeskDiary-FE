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
              <p>유저이름</p>
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
  height: 5.5vh;
  width: 3.2vw;
  background-color: transparent; // 기본 배경색을 투명으로 설정
  transition: width 0.4s, background-color 0.3s; // width와 background-color에 대한 transition 추가

  font-size: 0.84vw;
  text-transform: capitalize;
  line-height: 1;
  border-radius: 3.2vw;
  opacity: 0.8;

  &.active {
    > img {
      height: 3.12vh;
      opacity: 1;
    }
  }

  &:hover {
    background-color: #d9d9d9;
    opacity: 1;
    width: 9.6vw;
    > img {
      opacity: 1;
      height: 3.12vh;
    }
  }

  > img {
    opacity: 0.3;
    border-radius: 50%;
    margin: 0 0.8vw;
    height: 3.12vh;
  }

  > p {
    width: 5.2vw;
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

  margin: 0.8vw;
  margin-top: 42vh;

  > img {
    width: 2.6vw;
    height: 4.7vh;
    border-radius: 50%;
    background-color: #d9d9d9;
    margin-right: 0.8vw;
  }

  > p {
    font-size: 0.8vw;
    width: 5.2vw;
    line-height: 123.5%; /* 18.525px */
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
  }
`;

const SidebarMenu = styled.div`
  display: grid;
  gap: 4.6vh;
  margin-top: 4.6vh;
  margin-left: 0.4vw;

  ${SidebarButton} img {
    transition: width 0.3s;
  }

  &:hover {
    width: 10.5vw;

    ${SidebarButton} img {
      transition: 0.3s;
    }
  }
`;

const Logo = styled.img`
  height: 4.2vh;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.8vh;
  width: 3.6vw;
  margin-top: 1.5vh;
  margin-left: 0.3vw;
`;

const SidebarInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 10.5vw;
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
  width: 4.2vw;
  height: 100vh;
  background: #999;
  transition: width 0.4s;

  ${SidebarHeader} {
    transition: width 0.3s; // 이걸 추가해!
  }

  &:hover {
    width: 10.5vw;

    ${SidebarHeader} {
      width: 10.5vw;
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
