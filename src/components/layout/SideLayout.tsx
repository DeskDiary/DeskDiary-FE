import React from 'react';
import { LogoHeader } from './index';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';

type SideLayoutProps = {};

const SideLayout: React.FC<SideLayoutProps> = () => {
  return (
    <Wrap>
      <LogoHeader />
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
  padding-top: 60px;
  padding-bottom: 200px;
`;
export default SideLayout;
