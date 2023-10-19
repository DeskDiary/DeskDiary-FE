import React, { useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import {
  hobby,
  home,
  logo,
  study,
  mypage,
  profile,
  mydesk,
} from '../../../images';
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
    url: '/:study',
  },
  {
    title: '취미룸',
    icon: hobby,
    url: '/:hobby',
  },
  {
    title: '책상기록',
    icon: mydesk,
    url: '/mydesk',
  },
];

const SideBar: React.FC<SideBarProps> = () => {
  const token = getCookie('token');

  return (
    <Sidebar>
      <GlobalStyle />
      <SidebarInner>
        <div>
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
        </div>
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

  color: var(--primary-01);
  

  &.active {
    > img {
      filter: grayscale(0); /* 회색조 */
    }
    > p {
      color: var(--primary-01);
    }
  }

  &:hover {
    border: 1px solid var(--primary-01);
    opacity: 1;
    width: 100%;
    > img {
      filter: grayscale(0);
    }
    > p {
      color: var(--primary-01);
    }
  }

  > img {
    border-radius: 50%;
    margin: 0 18px 0 15px;
    filter: grayscale(100%);
  }

  > p {
    width: 100px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
    color: var(--gray-06);
  }
`;

const SidebarMenu = styled.div`
  display: grid;
  padding: 8px;
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
  justify-content: space-between;
`;

const Sidebar = styled.div`
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 80px;
  height: 100vh;
  /* background: #999; */
  transition: width 0.4s;

  ${SidebarHeader} {
    transition: width 0.3s; // 이걸 추가해!
  }

  &:hover {
    width: 200px;

    ${SidebarHeader} {
      width: 200px;
    }

    ${SidebarButton} p {
      opacity: 1;
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
