import React from 'react';
import styled from 'styled-components';
import ModalBackground from '../../../../components/ModalBackground';
import TimerInfoModal from './TimerInfoModal';
import PrecautionsModal from './PrecautionsModal';
import AsmrInfoModal from './AsmrInfoModal';
import ChatInfoModal from './ChatInfoModal';

type RoomInfoModalProps = {};

const RoomInfoModal: React.FC<RoomInfoModalProps> = () => {
  return (
    <Container>
      <ModalBackground blur="none"/>
      <TimerInfoModal />
      <AsmrInfoModal />
      <ChatInfoModal />
      <PrecautionsModal />
    </Container>
  );
};

const Container = styled.div``;
export default RoomInfoModal;
