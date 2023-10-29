import React, { useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { hobby, home, logo, study, mydesk } from '../../../images';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getCookie, setTokenCookie } from '../../../auth/cookie';
import { useRecoilState } from 'recoil';
import { SelectCateoryAtom } from '../../../recoil/RoomAtom';
import { toast } from 'sonner';

type SideBarProps = {};

const navItems = [
  {
    id: 1,
    title: '홈',
    icon: home,
    url: '/',
  },
  {
    id: 2,
    title: '스터디룸',
    icon: study,
    url: '/study',
  },
  {
    id: 3,
    title: '취미룸',
    icon: hobby,
    url: '/hobby',
  },
];

const SideBar: React.FC<SideBarProps> = () => {
  const token = getCookie('token');
  const navigate = useNavigate();

  const delayedRedirect = (path: string) => {
    setTimeout(() => {
      navigate(path);
    }, 1000);
  };

  return (
    <Sidebar>
      <GlobalStyle />
      <SidebarInner>
        <div>
          <SidebarHeader>
            <Logo src={logo} alt="Logo"></Logo>
          </SidebarHeader>
          <SidebarMenu>
            {navItems.map(item => (
              <SidebarButton key={item.id} to={item.url}>
                <img src={item.icon} alt="menu icon" />
                <p>{item.title}</p>
              </SidebarButton>
            ))}
            <SidebarButton
              to={token ? '/mydesk' : '/login'}
              onClick={(e) => {
                if (!token) {
                  e.preventDefault(); // NavLink의 기본 이동을 막아줌
                  toast.error('로그인이 필요합니다.', {
                    style: {
                      backgroundColor: '#ccdfff',
                      opacity: 0.6,
                      color: 'white'
                    }
                  })
                  delayedRedirect('/login');
                }
              }}
            >
              <img src={mydesk} alt="menu icon" />
              <p>책상 기록</p>
            </SidebarButton>
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
  border-radius: 50px;
  opacity: 0.8;
  margin-left: 5px;

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
    width: 90%;
    > img {
      filter: grayscale(0);
    }
    > p {
      color: var(--primary-01);
    }
  }

  > img {
    height: 35px;
    border-radius: 50%;
    filter: grayscale(100%);
    padding: 0 10px;
  }

  > p {
    width: 80px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
    color: var(--gray-06);
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;

    > img {
      height: 35px;
      border-radius: 50%;
      filter: grayscale(100%);
      padding: 0 10px;
    }

    > p {
      width: 80px;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.4s ease-in-out;
      color: var(--gray-06);
    }
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
    width: 160px;

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
  width: 160px;
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
  background: white;
  transition: width 0.4s;
  z-index: 1000;

  ${SidebarHeader} {
    transition: width 0.3s; // 이걸 추가해!
  }

  &:hover {
    width: 160px;

    ${SidebarHeader} {
      width: 160px;
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
