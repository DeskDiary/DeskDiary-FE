import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import MaxUser from '../../../images/room/MaxUser.svg';
import sample from '../../../images/sample.jpg';
import { RoomAtom } from '../../../recoil/RoomAtom';
import JoinRoomModal from '../../JoinRoomModal';

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
    file?: string;
    title: string;
    updatedAt: string;
    uuid: string;
  };
};

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Thumbmail
        src={room.file ? room.file : sample}
        alt="room thumbnail"
        onClick={() => setIsOpen(true)}
      ></Thumbmail>
      <Contents onClick={() => setIsOpen(true)}>
        <Img></Img>
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
      {isOpen && <JoinRoomModal setIsOpen={setIsOpen} room={room} />}
    </Container>
  );
};

const ContentText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin-right: auto;

  > img {
    width: 20px;
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
  margin: 12px 0;
  height: 50px;
  width: 100%;
`;

const Thumbmail = styled.img`
  width: 97%;
  border-radius: 10px;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 200px;
  cursor: pointer;
`;
export default RoomCard;
