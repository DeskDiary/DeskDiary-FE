import React, { useState } from 'react';
import styled from 'styled-components';
import addroom from '../images/main/addroom.svg';
import { getCookie } from '../auth/cookie';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import CreateRoomModal from '../pages/home/components/CreateRoomModal';
import {MdOutlineAddHome} from 'react-icons/md'

type CreateRoomButtonProps = {};

const CreateRoomButton: React.FC<CreateRoomButtonProps> = () => {
  const token = getCookie('token');
  const [openCreateRoom, setOpenCreateRoom] = useState(false);

  const onClickCreateRoomButton = () => {
    setOpenCreateRoom(!openCreateRoom);
  };

  return (
    <>
      {token && (
        <Button onClick={onClickCreateRoomButton}>
          {/* <img src={addroom} alt="add-room" /> */}
          <Icon><MdOutlineAddHome/></Icon>
          <p>방만들기</p>
        </Button>
      )}
      {openCreateRoom && (
        <CreateRoomModal setOpenCreateRoom={setOpenCreateRoom} />
      )}
    </>
  );
};

const Icon = styled.div`
  color: white;
  font-size: 40px;
  margin-bottom: 5px;
`

const Button = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #006eff;
  position: fixed;
  bottom: 100px;
  right: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 5px solid white;
  box-shadow: 2px 4px 9px 0px rgba(0, 0, 0, 0.25);

  > img {
    width: 45px;
    margin-left: 5px;
  }
  > p {
    color: white;
    font-size: 18px;
    font-weight: 700;
  }
`;
export default CreateRoomButton;
