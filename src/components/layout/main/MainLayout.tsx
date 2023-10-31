import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
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
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default MainLayout;
