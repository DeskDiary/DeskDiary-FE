import styled from '@emotion/styled';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthHeader } from '../index';

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

const index = 10;

const arr = Array.from({length:index}).fill(0);

