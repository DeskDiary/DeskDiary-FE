import React from 'react';
import styled from 'styled-components';
import Chat from './Chat';

type ChatBoxProps = {};

const ChatBox: React.FC<ChatBoxProps> = () => {
  return (
    <Container column justify="start">
      <ChatList column justify="start" align="start">
        <Chat />
      </ChatList>
      <UserText justify="start">
        <UserInput></UserInput>
        <SendButton></SendButton>
      </UserText>
    </Container>
  );
};

const FlexContainer = styled.div<{
  column?: boolean;
  align?: string;
  justify?: string;
  gap?: string;
}>`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  align-items: ${props => (props.align ? props.align : 'center')};
  justify-content: ${props => (props.justify ? props.justify : 'center')};
  gap: ${props => props.gap || '0'};
`;

const SendButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  margin: 10px;
`;

const UserInput = styled.input`
  width: 100%;
  border-radius: 5px;
  border: none;
  padding: 10px 15px;
  font-size: 15px;
  &:focus {
    outline: none;
  }
`;

const UserText = styled(FlexContainer)`
  width: 100%;
  padding: 10px 0;
`;

const ChatList = styled(FlexContainer)`
  background-color: white;
  height: 100%;
  width: calc(100% - 40px);
  padding: 20px;
`;
const Container = styled(FlexContainer)`
  width: 100%;
  height: 100%;
`;

export default ChatBox;
