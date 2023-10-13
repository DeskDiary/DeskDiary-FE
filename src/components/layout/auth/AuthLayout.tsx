import React from 'react';
import { AuthHeader } from '../index';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';

type SideLayoutProps = {};

const SideLayout: React.FC<SideLayoutProps> = () => {
  return (
    <Wrap>
      <AuthHeader />
      <Outlet />
    </Wrap>
  );
};

const Wrap = styled.div`
  min-height: calc(100vh - 260px);
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: center;
  padding-top: 76px;

`;
export default SideLayout;
