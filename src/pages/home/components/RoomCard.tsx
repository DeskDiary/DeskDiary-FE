import React, { useState } from 'react';
import styled from 'styled-components';
import thumbnail from '../../../images/sample.png';
import { Link } from 'react-router-dom';
import JoinRoomModal from '../../JoinRoomModal';
import { useRecoilValue } from 'recoil';
import { RoomAtom } from '../../../recoil/RoomAtom';

type RoomCardProps = {
  room: {
    uuid: string;
    title: string;
    category: string;
    agoraAppId: string;
    agoraToken: string;
    ownerId: number;
    file: string;
  };
};

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const [isOpen, setIsOpen] = useState(false);

  const rooms = useRecoilValue(RoomAtom);

  return (
    <Container col justify="center">
      <Thumbmail src={room.file} onClick={() => setIsOpen(true)}></Thumbmail>
      <Contents justify="start" gap="9px"  onClick={() => setIsOpen(true)}>
        <Img></Img>
        <ContentText col justify="start">
          <RoomTitle>{room.title}</RoomTitle>
          <Tags justify="start" align="center" gap="6">
            <Tag>#{room.category}</Tag>
            <Tag>#{room.category}</Tag>
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

const Tags = styled(FlexContainer)``;

const Tag = styled.div`
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 123.5%; /* 18.525px */
  letter-spacing: 0.25px;
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
  width: 100%;
  height: 100%;
`;

const Thumbmail = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const Container = styled(FlexContainer)`
  width: 100%;
  height: 240px;
  cursor: pointer;
`;
export default RoomCard;
