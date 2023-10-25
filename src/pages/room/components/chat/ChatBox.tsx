import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import send from '../../../../images/send.svg';
import 공지사진 from '../../../../images/공지.png';
import Chat from './Chat';
import { ChatMessagesAtom } from '../../../../recoil/ChatAtom';
import { useRecoilState } from 'recoil';
import { fetchUser } from '../../../../axios/api';
import { useQuery } from 'react-query';
import socket from './socketInstance';

// const socket = io('http://localhost:5000');
// const socket = io(`${process.env.REACT_APP_SERVER_URL!}`);

type ChatBoxProps = { roomId: string };

type MessageData = {
  message: string;
  nickname : string;
  img: string;
  time: string;
  roomId: string;
};

const ChatBox: React.FC<ChatBoxProps> = ({ roomId }) => {
  const [username, setUserName] = useState('');
  const [chatActive, setChatActive] = useState(false);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const { data } = useQuery<user>('chatUser', fetchUser);

  useEffect(() => {
    socket.on('msgToClient', (message: MessageData) => {
      console.log("받은 메시지:", message);  // 이 부분을 추가해줘!
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      console.log('off')
      socket.off('msgToClient');
    };

  }, [socket]);

  const socketConfirm = () => {
    console.log('useEffect 실행', messages);
    socket.on('msgToClient', (message: MessageData) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });
    console.log('messages❤️✨', messages);
  }


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const messageData = {
      message: newMessage,
      nickname : data?.nickname,
      img: data?.profileImage,
      uuid: roomId,
    };

    console.log('전송전', messageData);
    newMessage !== ''
      ? socket.emit('msgToServer', messageData)
      : alert('메세지를 입력해주세요');
    setNewMessage('');
    console.log('전송후');
  };

  return (
    <Container>
      <ChatImg src={공지사진} />
      <ChatList>
        {messages.map((message, index) => {
          return <Chat key={index} message={message} />;
        })}
      </ChatList>
      <ChatForm onSubmit={handleSubmit}>
        <UserInput
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        ></UserInput>
        <SendButton type="submit">
          <img src={send} />
        </SendButton>
      </ChatForm>
      <button type="button" onClick={socketConfirm}>확인</button>
    </Container>
  );
};

const ChatImg = styled.img`
  margin: 5px auto 0 5px;
  filter: grayscale(100%);
`;

const SendButton = styled.button`
  width: 35px;
  height: 35px;
  border: none;
  margin: 10px;
  background-color: transparent;
  cursor: pointer;
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
  background-color: transparent;
  color: var(--gray-01);
`;

const ChatForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  height: 42px;
  width: 92%;
  margin: 12px;
  border: 1px solid var(--primary-01);
  border-radius: 5px;
  background-color: transparent;
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 15px;

  height: 100%;
  width: calc(100% - 40px);
  padding: 20px;
  border-bottom: 1px solid var(--gray-05);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 100%;
  height: 100%;
  border: 1px solid var(--gray-07);
`;

export default ChatBox;
