import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { getCookie } from '../auth/cookie';
import { Link } from 'react-router-dom';
import CreateRoomModal from '../pages/home/components/CreateRoomModal';
import { MdOutlineAddHome, MdTrendingUp } from 'react-icons/md';
import cute from '../images/ranking/2nd.svg';
import cute2 from '../images/ranking/1st.svg';
import { FaCuttlefish } from 'react-icons/fa';

type CreateRoomButtonProps = {};

const CreateRoomButton2: React.FC<CreateRoomButtonProps> = () => {
  const token = getCookie('token');
  const [openCreateRoom, setOpenCreateRoom] = useState(false);

  const onClickCreateRoomButton = () => {
    setOpenCreateRoom(true);
  };

  return (
    <Container>
      {token ? (
        <Button>
          <div onClick={onClickCreateRoomButton}>
            <Img src={cute} alt="cute" />
            <HoverImg src={cute2} alt="cute2" />
            <p>나를 누르면 방을 만들 수 있어!</p>
          </div>
        </Button>
      ) : (
        <Login to="/login">
          <p>로그인</p>
        </Login>
      )}
      {openCreateRoom && (
        <CreateRoomModal setOpenCreateRoom={setOpenCreateRoom} />
      )}
    </Container>
  );
};

const bounce = keyframes`
  0%, 30%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-25px);
  }
  40% {
    transform: translateY(-15px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const Container = styled.div`
  z-index: 50;
`;

const Login = styled(Link)`
  font-size: 17px;
  font-weight: 700;
  color: #006eff;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: white;
  position: fixed;
  bottom: 100px;
  right: 100px;
  border: 5px solid var(--primary-01);

  display: flex;
  align-items: center;
  justify-content: center;
  > p {
    font-size: 24px;
    color: var(--primary-01);
  }
`;

const HoverImg = styled.img`
  width: 180px;
  height: 120px;
  opacity: 0;
  transition: opacity 0.3s;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Icon = styled.div`
  color: #006eff;
  font-size: 40px;
  margin-bottom: 5px;
  > img {
    width: 100px;
  }
`;

const Img = styled.img`
  width: 180px;
  height: 120px;
  opacity: 1;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Button = styled.div`
  width: 100px;
  height: 100px;
  position: fixed;
  bottom: 30px;
  right: 30px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    > div {
      ${Img} {
        animation: ${bounce} 2s infinite;
        /* opacity: 0; */
      }
      /* ${HoverImg} {
        transform: translateY(-10px);
        opacity: 1;
      } */
    }
    > p {
      transform: translateY(-15px);
      animation: ${bounce} 2s infinite;
    }
  }

  > img {
    width: 45px;
    margin-left: 5px;
  }
  > div {
    position: relative;
    > p {
      position: absolute;
      bottom: -50px;
      left: -150px;
      color: black;
      font-size: 17px;
      font-weight: 500;
      width: 120px;
      text-align: center;
      background-color: #e8f1ffae;
      border-radius: 10px;
    }
  }
`;
export default CreateRoomButton2;
