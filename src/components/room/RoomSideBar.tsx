import React from 'react';
import styled from 'styled-components';
import logo from '../../images/logo.svg';

type RoomSideBarProps = {};

const RoomSideBar: React.FC<RoomSideBarProps> = () => {
  return (
    <Body>
      <LogoImg src={logo} alt="" />
      <TimeBox>시간기록 Box</TimeBox>
    </Body>
  );
};

const Body = styled.div`
  background: var(--gray-09, #424242);
  width: 224px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const LogoImg = styled.img`
  margin-top: 20px;
  width: 224px;
  height: 56px;
  flex-shrink: 0;
`;

const TimeBox = styled.div`
  margin-top: 178px;
  width: 224px;
  height: 468px;
  flex-shrink: 0;
  background: #ababab;
`;
export default RoomSideBar;
