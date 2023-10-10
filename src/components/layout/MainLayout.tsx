import React from 'react';
import { Header, Footer } from './index';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';

type MainLayoutProps = {};

const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <Wrap>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </Wrap>
  );
};

const Wrap = styled.div`
  min-height: calc(100vh - 260px);
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 60px;
  padding-bottom: 200px;
`;
export default MainLayout;
