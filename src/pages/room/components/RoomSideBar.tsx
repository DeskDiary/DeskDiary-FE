import React from 'react';
import styled from 'styled-components';
import logo from '../../../images/logo.svg';

type RoomSideBarProps = {};

const RoomSideBar: React.FC<RoomSideBarProps> = () => {
  return (
    <Body>
      <LogoImg src={logo} alt="" />
      <TimeBox>
        {/* <img src="" alt="" /> */}
        <p>시간 기록 시작</p>
        <p>타이머</p>
        <p>일시정지</p>
        <RoomCheckOut>방나가기</RoomCheckOut>
      </TimeBox>
    </Body>
  );
};

const Body = styled.div`
  background: var(--gray-09, #424242);
  width: 224px;
  height: calc(100vh - 60);
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

const RoomCheckOut = styled.button`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  background: #fff;
  border: none;
`;
export default RoomSideBar;
