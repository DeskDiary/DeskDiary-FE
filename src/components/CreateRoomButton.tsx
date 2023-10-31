import React, { useState } from 'react';
import styled from 'styled-components';
import addroom from '../images/main/addroom.svg';
import { getCookie } from '../auth/cookie';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import CreateRoomModal from '../pages/home/components/CreateRoomModal';

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
          <img src={addroom} alt="add-room" />
        </Button>
      )}
      {openCreateRoom && <CreateRoomModal setOpenCreateRoom={setOpenCreateRoom} />}
    </>
  );
};

const Button = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #006eff;
  position: fixed;
  bottom: 100px;
  right: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    width: 50%;
    margin-left: 5px;
  }
  /* background-image: url(${addroom});
  background-size: cover;
  background-position: center; */
`;
export default CreateRoomButton;
