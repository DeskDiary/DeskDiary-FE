import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MaxUser from '../../../images/room/MaxUser.svg';
import sample from '../../../images/sample.svg';
import ConfirmModal from '../../../components/ConfirmModal';
import { useQuery } from 'react-query';
import { fetchUser } from '../../../axios/api';
import { getCookie } from '../../../auth/cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  DeleteRoomAtom,
  RoomAtom,
  RoomUUIDAtom,
} from '../../../recoil/RoomAtom';
import { useRecoilState } from 'recoil';
import { QueryObserverResult } from 'react-query';
import { study_color, hobby_color } from '../../../images/main';

type RoomCardProps = {
  room: {
    agoraAppId: string;
    agoraToken: string;
    category: string;
    count: number;
    createdAt: string;
    maxHeadcount: number;
    note: string;
    nowHeadcount: number;
    ownerId: number;
    roomId: number;
    roomThumbnail: string | null;
    title: string;
    updatedAt: string;
    uuid: string;
  };
  fetch?: string;
};

const RoomCard: React.FC<RoomCardProps> = ({ room, fetch }) => {
  const token = getCookie('token');

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteRoomModal, setIsOpenDeleteRoomModal] =
    useRecoilState(DeleteRoomAtom);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [joinUUID, setJoinUUID] = useRecoilState<string>(RoomUUIDAtom);
  const [roomInfo, setRoomInfo] = useRecoilState(RoomAtom);

  const navigate = useNavigate();

  const { data } = useQuery<user, Error>('userCreatedRoom', fetchUser, {
    refetchOnWindowFocus: false,
  });

  const handleImageLoaded = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setIsImageLoaded(false);
  };

  const JoinRoomModal = async (token: any) => {
    navigate(`/room/${room.uuid}`);
  };

  const deleteRoomHandler = async () => {
    await setIsOpenDeleteRoomModal(true);
    await setJoinUUID(room.uuid);
  };

  const onClickCard = async () => {
    if (room.nowHeadcount === room.maxHeadcount) {
      toast.error('방이 꽉찼어요🥲');
      return;
    }

    if (token) {
      // setIsOpen(true);
      JoinRoomModal(token);
    } else {
      toast.error('로그인이 필요합니다.', {
        style: {
          backgroundColor: '#ccdfff',
          opacity: 0.6,
          color: 'white',
        },
      });
      navigate('/login');
    }
  };

  return (
    <Container>
      {!isImageLoaded && <img src={sample} alt="thumbnail" />}
      <Thumbmail
        onLoad={handleImageLoaded}
        onError={handleImageError}
        style={{ display: isImageLoaded ? 'block' : 'none' }}
        src={room.roomThumbnail ? room.roomThumbnail : sample}
        alt="room thumbnail"
        onClick={onClickCard}
      />
      <Contents onClick={onClickCard}>
        <ContentText>
          <RoomTitle>{room.title}</RoomTitle>
          <Tag>
            <img src={MaxUser} alt="user count" />
            {room.nowHeadcount}/{room.maxHeadcount}
          </Tag>
        </ContentText>
      </Contents>
      {data?.userId === room.ownerId && fetch === 'fetchCreatedRoom' && (
        <Delete onClick={deleteRoomHandler}>삭제</Delete>
      )}
      <Cat>
        {(fetch === 'fetchRoomTopLatest' ||
          fetch === 'fetchRoomTopPopular') && (
          <Category
            src={room.category === 'study' ? study_color : hobby_color}
            alt="category"
          />
        )}
      </Cat>
    </Container>
  );
};

const Cat = styled.div`
  position: absolute;
  top: 0;
  left: 0px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 3px 5px;
  border-radius: 10px;
`;

const Category = styled.img`
  filter: grayscale(100%);
`;

const ContentText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 100%;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: auto;
  width: 100%;
`;

const Delete = styled.button`
  position: absolute;
  right: 5px;
  bottom: 0;
  padding: 5px;
  border-radius: 10px;

  &:hover {
    color: red;
  }
`;

const Tag = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;

  margin-left: 5px;
  > img {
    width: 20px;
  }
`;

const RoomTitle = styled.div`
  margin-right: auto;
  overflow: hidden;
  font-size: 14px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 20px;
  width: 95%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Img = styled.div`
  background-color: #d9d9d9;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
  height: 50px;
  width: 100%;
`;

const Thumbmail = styled.img`
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  object-fit: cover;
  transition: transform 0.3s ease-in-out; // <-- 이 부분 추가
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 200px;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease-in-out; // <-- 이 부분 추가
  z-index: 10;

  &:hover {
    /* ${Thumbmail} {
      transform: translateY(-10px); // <-- 이 부분 추가
      transform: scale(1.05);
      box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.3);
      background-color: #cfcfcf2d;
    } */
    transform: translateY(-10px); // <-- 이 부분 추가
    transform: scale(1.07);
    /* box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.1); */
  }

  > img {
    width: 97%;
    border-radius: 10px;
    overflow: hidden;
  }
`;
export default RoomCard;
