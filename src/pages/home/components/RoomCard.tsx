import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
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

  const rooms = useRecoilValue(RoomAtom);

  return (
    <Container col justify="center">
      <Thumbmail
        src={room.file ? room.file : sample}
        onClick={() => setIsOpen(true)}
      ></Thumbmail>
      <Contents justify="start" gap="9px" onClick={() => setIsOpen(true)}>
        <Img></Img>
        <ContentText col justify="start">
          <RoomTitle>{room.title}</RoomTitle>
          <Tags justify="start" align="center">
            <img src={MaxUser} />
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

const FlexContainer = styled.div<{
  col?: boolean;
  align?: string;
  justify?: string;
  gap?: string;
}>`
  display: flex;
  flex-direction: ${props => (props.col ? 'column' : 'row')};
  align-items: ${props => (props.align ? props.align : 'center')};
  justify-content: ${props => (props.justify ? props.justify : 'center')};
  gap: ${props => props.gap || '0'};
`;

const ContentText = styled(FlexContainer)``;

const Tags = styled(FlexContainer)`
  margin-right: auto;
`;

const Tag = styled.div`
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 123.5%; /* 18.525px */
  letter-spacing: 0.25px;

  margin-left: 15px;
`;

const RoomTitle = styled.div`
  margin-right: auto;
  overflow: hidden;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 123.5%; /* 18.525px */
  letter-spacing: 0.25px;
  text-overflow: ellipsis;

  width: 240px;
`;

const Img = styled.div`
  background-color: #d9d9d9;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Contents = styled(FlexContainer)`
  margin: 12px 0;
  height: 50px;
`;

const Thumbmail = styled.img`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

const Container = styled(FlexContainer)`
  width: 290px;
  height: 240px;
  cursor: pointer;
`;
export default RoomCard;
