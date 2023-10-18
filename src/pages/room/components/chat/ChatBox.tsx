import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Chat from './Chat';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

type ChatBoxProps = {};

type MessageData = {
  message: string;
  user: string;
  time: string;
};

const ChatBox: React.FC<ChatBoxProps> = () => {
  const [username, setUserName] = useState('');
  const [chatActive, setChatActive] = useState(false);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('received-message', (message: MessageData) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });
    console.log('messages', messages);

    return () => {
      socket.off('received-message');
    };
  }, [messages, socket]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const now = new Date(Date.now());
    const time = `${now.getHours()}:${now.getMinutes()}`;

    const messageData = {
      message: newMessage,
      user: username,
      time: time,
    };

    newMessage !== ''
      ? socket.emit('send-message', messageData)
      : alert('메세지를 입력해주세요');
    setNewMessage('');
  };

  return (
    <Container col justify="start">
      <ChatList col justify="start" align="start" gap="15px">
        {messages.map((message, index) => {
          return <Chat key={index} message={message}/>;
        })}
      </ChatList>
      <ChatForm onSubmit={handleSubmit}>
        <UserInput
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        ></UserInput>
        <SendButton type="submit"></SendButton>
      </ChatForm>
      <div className="w-screen h-screen flex justify-center items-center gap-2">
            <input
              type="text"
              name=""
              id=""
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="text-center px-3 py-2 outline-none border-2 rounded-md"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-3 py-2 rounded-md font-bold"
            >
              Start chat
            </button>
          </div>
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

const ChatForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
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
