import React, { useState } from 'react';
import styled from 'styled-components';
import MaxUser from '../../../images/room/MaxUser.svg';
import sample from '../../../images/sample.svg';
import JoinRoomModal from './JoinRoomModal';
import ConfirmModal from '../../../components/ConfirmModal';
import { useQuery } from 'react-query';
import { fetchUser } from '../../../axios/api';
import { getCookie } from '../../../auth/cookie';
import { useNavigate } from 'react-router-dom';

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
  const [isOpenDeleteRoomModal, setIsOpenDeleteRoomModal] = useState(false);

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();
  const { data } = useQuery<user, Error>('userCreatedRoom', fetchUser, {
    staleTime: Infinity, // 캐시 시간을 무한대로 설정
  });

  const handleImageLoaded = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setIsImageLoaded(false);
  };

  const onClickCard = () => {
    if (token) {
      setIsOpen(true);
    } else {
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
      ></Thumbmail>
      <Contents onClick={onClickCard}>
        {/* <Img></Img> */}
        <ContentText>
          <RoomTitle>{room.title}</RoomTitle>
          <Tags>
            <img src={MaxUser} alt="user count" />
            <Tag>
              {room.nowHeadcount}/{room.maxHeadcount}
            </Tag>
          </Tags>
        </ContentText>
      </Contents>
      {data?.userId === room.ownerId && fetch === 'fetchCreatedRoom' && (
        <Delete onClick={() => setIsOpenDeleteRoomModal(true)}>삭제</Delete>
      )}
      {isOpen && <JoinRoomModal setIsOpen={setIsOpen} room={room} />}
      {isOpenDeleteRoomModal && (
        <ConfirmModal
          title="삭제"
          uuid={room.uuid}
          setIsOpen={setIsOpenDeleteRoomModal}
        />
      )}
    </Container>
  );
};

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
  justify-content: start;
  align-items: center;
  margin-right: auto;
  width: 100%;

  > img {
    width: 20px;
  }
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

  margin-left: 5px;
`;

const RoomTitle = styled.div`
  margin-right: auto;
  overflow: hidden;
  font-size: 14px;
  font-weight: 500;
  text-overflow: ellipsis;
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
  margin-top: 12px;
  height: 50px;
  width: 100%;
`;

const Thumbmail = styled.img`
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  object-fit: cover;
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

  > img {
    width: 97%;
    border-radius: 10px;
    overflow: hidden;
  }
`;
export default RoomCard;
