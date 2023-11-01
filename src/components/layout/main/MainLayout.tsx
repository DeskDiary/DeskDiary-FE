import styled from '@emotion/styled';
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import CreateRoomButton from '../../CreateRoomButton';

type MainLayoutProps = {};

const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <Wrap>
      <SideBar />
      <Outlet />
      <CreateRoomButton />
    </Wrap>
  );
};

const Wrap = styled.div`
  min-height: calc(100vh - 110px);
  position: relative;
  width: calc(100vw - 65px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-left: 60px;
  margin-top: 80px;
  margin-bottom: 100px;
`;
export default MainLayout;
