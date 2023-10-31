import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import styled, { createGlobalStyle } from 'styled-components';
import { getCookie } from '../../../auth/cookie';
import { hobby, home, mydesk, study } from '../../../images';
import test from '../../../images/test.png';
import profile from '../.././../images/profile.svg';
import { useQuery } from 'react-query';
import { fetchUser } from '../../../axios/api';

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

  const { data } = useQuery<user>('sidebar-user', fetchUser, {
    refetchOnWindowFocus: false,
  });

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
            <Logo src={test} alt="Logo"></Logo>
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
              onClick={e => {
                if (!token) {
                  e.preventDefault(); // NavLink의 기본 이동을 막아줌
                  toast.error('로그인이 필요합니다.', {
                    style: {
                      backgroundColor: '#ccdfff',
                      opacity: 0.6,
                      color: 'white',
                    },
                  });
                  delayedRedirect('/login');
                }
              }}
            >
              <img src={mydesk} alt="menu icon" />
              <p>책상 기록</p>
            </SidebarButton>
          </SidebarMenu>
          <SidebarButton className="mypage" to={token ? '/mypage' : '/login'}>
            {token ? (
              <>
                <img
                  src={data?.profileImage ? data.profileImage : profile}
                  alt="menu icon"
                ></img>
                <p>{data?.nickname}</p>
              </>
            ) : (
              <>
                <img src={profile} alt="menu icon"></img>
                <p>로그인</p>
              </>
            )}
          </SidebarButton>
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
  /* opacity: 0.8; */
  margin-left: 5px;

  color: white;
  opacity: 0.5;

  &.active {
    opacity: 1;
    > img {
      filter: grayscale(0); /* 회색조 */
    }
    > p {
      color: white;
    }
  }

  &:hover {
    opacity: 1;
    width: 85%;
    background-color: rgba(255, 255, 255, 0.2);
    > img {
      filter: grayscale(0);
    }
    > p {
      color: white;
      font-weight: 500;
    }
  }

  > img {
    height: 25px;
    border-radius: 50%;
    filter: grayscale(100%);
    padding: 0 15px;
  }

  > p {
    width: 80px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
    color: white;
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
      
      color: var(--gray-03);
    }
  }

  &.mypage {
    margin-left: 15px;
    opacity: 1;
    > img {
      height: 35px;
      width: 35px;
      padding: 0;
      margin-left: 7px;
      border-radius: 50%;
      filter: grayscale(0);
    }
  }
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 30px;
  margin-top: 50px;
  margin-bottom: 50px;

  ${SidebarButton} img {
    transition: width 0.3s;
  }

  &:hover {
    width: 180px;

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
  width: 180px;
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
  background: #0054a8;
  transition: width 0.4s;
  z-index: 1000;

  ${SidebarHeader} {
    transition: width 0.3s; // 이걸 추가해!
  }

  &:hover {
    width: 180px;

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
