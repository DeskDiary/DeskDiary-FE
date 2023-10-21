import React, { useState } from 'react';
import styled from 'styled-components';
import {fetchUser} from '../../../../axios/api'
import { getCookie, setTokenCookie } from '../../../../auth/cookie';
import { useQuery } from 'react-query';
import {profile} from '../../../../images'

type ChatProps = {
  message: {
    message: string;
    user: string;
    time: string;
  };
};

const Chat: React.FC<ChatProps> = ({message}) => {
  const [isMe, setIsMe] = useState(false);
  const token = getCookie('token');

  const { data } = useQuery<user, Error>(
    'user',
    fetchUser,
  );

  return (
    <Container justify="start" align="start" gap="8px">
      <UserImg 
        src= {data?.profileImage ? data?.profileImage : profile}
        />
      <ChatDetails col align="start" gap="5px">
        <Metadata justify="space-between">
          <UserName>{data?.nickname}</UserName>
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
`;

const Time = styled.div`
  color: var(--gray-05);
  font-size: 12px;
  margin-left: auto;
`;

const Message = styled.div`
  font-size: 15px;
  word-wrap: break-word;
  width: 100%;
  color: white;
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

const UserImg = styled.img`
  height: 24px;
  width: 24px;
  background-color: #d9d9d9;
  border-radius: 50%;
`;

const Container = styled(FlexContainer)`
  width: 100%;
`;
export default Chat;
