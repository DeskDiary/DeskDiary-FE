import React from 'react';
import styled from 'styled-components';
import ModalBackground from '../../../../components/ModalBackground';

type RoomInfoModalProps = {
  
};

const RoomInfoModal:React.FC<RoomInfoModalProps> = () => {
  console.log('1231231231321231')
  return <Container>
    <ModalBackground blur='none'/>
    <Content>
    123
    </Content>
  </Container>
}
const Content = styled.div`

`

const Container = styled.div`

`
export default RoomInfoModal;