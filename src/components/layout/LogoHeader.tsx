import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { toast } from 'sonner';
import styled from '@emotion/styled';

type LogoHeaderProps = {};

const LogoHeader: React.FC<LogoHeaderProps> = () => {
  return (
    <NavHeader>
      <NavContent justify="space-between">
        <Logo>
          <Link to="/">
            <img src="/images/Logo.png" />
          </Link>
        </Logo>
      </NavContent>
    </NavHeader>
  );
};

const FlexContainer = styled.div<{
  column?: boolean;
  align?: string;
  justify?: string;
  gap?: string;
}>`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  align-items: ${props => (props.align ? props.align : 'center')};
  justify-content: ${props => (props.justify ? props.justify : 'center')};
  gap: ${props => props.gap || '0'};
`;

const NavHeader = styled(FlexContainer)`
  width: 100vw;
  height: 76px;
  background-color: white;
  box-shadow: 0px 2px 6px 0px #e8e8e8;

  position: fixed;
  top: 0;
  left: 0;
`;

const NavContent = styled(FlexContainer)`
  width: 1200px;
  height: 100%;
`;

const Logo = styled.div`
  width: 100px;
`;

export default LogoHeader;
