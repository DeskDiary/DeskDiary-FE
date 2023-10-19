import React from 'react';
import styled from 'styled-components';
import logo from '../../../images/logo.png';

type RoomSideBarProps = {};

const RoomSideBar: React.FC<RoomSideBarProps> = () => {
  return (
    <Body>
      <LogoImg src={logo} alt="" />
      <UserInfoBox>
        <img
          src="https://avatars.githubusercontent.com/u/120389368?v=4"
          alt=""
        />
        <p>유저이름</p>
      </UserInfoBox>
      <TimerBox>
        <p>00:00:00</p>
        <button>기록시작</button>
      </TimerBox>
    </Body>
  );
};

const Body = styled.div`
  background: var(--gray-09, #424242);
  width: 224px;
  height: calc(100vh - 60);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImg = styled.img`
  margin: 16px;
  width: 60px;
  height: 73px;
  flex-shrink: 0;
`;
const UserInfoBox = styled.div`
  width: 152px;
  height: 164px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
  /* background-color: beige; */
  p {
    margin: 16px;
    color: white;
    text-align: center;
  }
  img {
    margin-top: 24px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
`;

const TimerBox = styled.div`
  margin-top: 16px;
  background-color: beige;
  width: 104px;
  height: 70px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 24px;

  button {
    width: 103px;
    height: 32px;
    background: var(--primary-01);
    border: none;
  }
`;

export default RoomSideBar;
