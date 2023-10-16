import React, { useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { hobby, home, logo, study, mypage, profile } from '../../../images';
import { Link } from 'react-router-dom';

type SideBarProps = {};

const navItems = [
  {
    title: 'Main Home',
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
    title: '마이페이지',
    icon: mypage,
    url: 'mypage',
  },
];

const SideBar: React.FC<SideBarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sidebar isOpen={isOpen}>
      <GlobalStyle />
      <SidebarInner>
        <SidebarHeader>
          <SidebarBurger type="button" onClick={() => setIsOpen(!isOpen)}>
            <span>{isOpen ? 'Close' : 'open'}</span>
          </SidebarBurger>
          <Logo src={logo}></Logo>
        </SidebarHeader>
        <SidebarMenu>
          {navItems.map(item => (
            <SidebarButton to={item.url} isOpen={isOpen}>
              <LogoBG isOpen={isOpen}>
                <img src={item.icon} />
              </LogoBG>

              <p>{item.title}</p>
            </SidebarButton>
          ))}
        </SidebarMenu>
      </SidebarInner>
    </Sidebar>
  );
};

const SidebarButton = styled(Link)<{ isOpen: boolean }>`
  display: flex;
  gap: 10px;
  align-items: center;
  height: 60px;
  width: 60px;
  font-size: 16px;
  text-transform: capitalize;
  line-height: 1;
  border-radius: 60px;
  opacity: 0.8;
  transition: width 0.4s;

  ${props =>
    props.isOpen &&
    `&:hover {
    background: #d9d9d9;
    opacity: 1;
    width: 100%;
  }`}

  > img {
    opacity: 0.5;
    width: ${props => (props.isOpen ? '200px' : '60px')};
    border-radius: 50%;
  }

`;

const LogoBG = styled.div<{isOpen:boolean}>`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  display: flex;
  padding: 10px;

  &:hover {
    opacity: 1;
    background-color: #d9d9d9;
    transition: 0.4s;
  }

  ${props =>
    props.isOpen &&
    `&:hover {
    background: #d9d9d9;
    opacity: 1;
    width: 100%;
  }`}
`;

const SidebarMenu = styled.div`
  display: grid;
  padding: 10px;
  gap: 50px;
  margin-top: 50px;
`;

const Logo = styled.img`
  height: 60px;
`;

const SidebarBurger = styled.button`
  width: 80px;
  height: 75px;
  display: grid;
  place-items: center;
  background-image: url(logo);
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  height: 72px;
  background-color: rgba(0, 0, 0, 0.15);
`;

const SidebarInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
`;

const Sidebar = styled.div<{ isOpen: boolean }>`
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 80px;
  height: 100%;
  background: #999;
  transition: width 0.4s;

  ${props =>
    props.isOpen &&
    `
      width: 200px;
      
      ${Logo}, ${SidebarButton} p {
        opacity: 0;
        transition: 0.3s;
      }
      
      ${SidebarButton} p, ${Logo} {
        opacity: 1;
      }
    `}
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
