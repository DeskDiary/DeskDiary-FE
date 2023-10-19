import React from 'react';
import styled from 'styled-components';

type ChatProps = {
  message: {
    message: string;
    user: string;
    time: string;
  };
};

const Chat: React.FC<ChatProps> = ({message}) => {
  return (
    <Container justify="start" align="start" gap="8px">
      <UserImg />
      <ChatDetails col align="start" gap="5px">
        <Metadata justify="space-between">
          <UserName>{message.user}</UserName>
          <Time>{message.time}</Time>
        </Metadata>

        <Message>
          {message.message}
        </Message>
      </ChatDetails>
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

const Metadata = styled(FlexContainer)`
  width: 100%;
  @media (min-width: 768px) {
    width: 300px;
  }
`;

const Time = styled.div`
  color: #9e9e9e;
  font-size: 12px;
`;

const Message = styled.div`
  font-size: 15px;
  word-wrap: break-word;
  width: 100%;
  @media (min-width: 768px) {
    width: 300px;
  }
`;

const UserName = styled.div`
  color: #9e9e9e;
  font-size: 15px;
`;

const ChatDetails = styled(FlexContainer)`
  width: 100%;
  @media (min-width: 768px) {
    width: 300px;
  }
`;

const UserImg = styled.div`
  height: 24px;
  width: 24px;
  background-color: #d9d9d9;
  border-radius: 50%;
`;

const Container = styled(FlexContainer)`
  width: 100%;
`;
export default Chat;
