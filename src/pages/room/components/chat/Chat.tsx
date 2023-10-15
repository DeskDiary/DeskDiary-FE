import React from 'react';
import styled from 'styled-components';

type ChatProps = {};

const Chat: React.FC<ChatProps> = () => {
  return (
    <Container justify="start" align="start" gap="8px">
      <UserImg />
      <ChatDetails column align="start" gap="5px">
        <Metadata justify="space-between">
          <UserName>유저 네임</UserName>
          <Time>2023-10-15 15:10</Time>
        </Metadata>

        <Message>메세지~!~~~!~!~!!~~!~!~!~!~!~!~!~!~!~!~sdfsdfsfsdfsdfsdfsdfsdfsdsdfsdfsfsdf!~~!~!</Message>
      </ChatDetails>
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
