import React from 'react';
import { Header, Footer } from '../index';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import SideMenu from './SideMenu';

type MainLayoutProps = {};

const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <Wrap>
      <Header></Header>
      <SideMenu></SideMenu>
      <Outlet />
    </Wrap>
  );
};

const Wrap = styled.div`
  min-height: calc(100vh - 260px);
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 76px;
  padding-bottom: 200px;
`;
export default MainLayout;
