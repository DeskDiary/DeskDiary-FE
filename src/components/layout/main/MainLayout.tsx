import React from 'react';
import { Header, Footer } from '../index';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import SideMenu from './SideMenu';
import SideBar from './SideBar';
import MainTop from '../../MainTop';

type MainLayoutProps = {};

const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <Wrap>
      {/* <Header></Header> */}
      {/* <SideMenu></SideMenu> */}
      <SideBar />
      {/* <MainTop /> */}
      <Outlet />
    </Wrap>
  );
};

const Wrap = styled.div`
  min-height: calc(100vh - 110px);
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default MainLayout;
