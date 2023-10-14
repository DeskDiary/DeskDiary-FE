import React from 'react';
import { Header, Footer } from '../index';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import SideMenu from './SideMenu';

type MainLayoutProps = {};

const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <Wrap>
      {/* <Header></Header> */}
      {/* <SideMenu></SideMenu> */}
      <Outlet />
    </Wrap>
  );
};

const Wrap = styled.div`
  min-height: calc(100vh);
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
export default MainLayout;
