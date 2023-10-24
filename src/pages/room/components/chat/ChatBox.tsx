import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import send from '../../../../images/send.svg';
import 공지사진 from '../../../../images/공지.png';
import Chat from './Chat';
import { ChatMessagesAtom } from '../../../../recoil/ChatAtom';
import { useRecoilState } from 'recoil';
import { fetchUser } from '../../../../axios/api';
import { useQuery } from 'react-query';

// const socket = io('http://localhost:5000');
const socket = io(`${process.env.REACT_APP_SERVER_URL!}`);

type ChatBoxProps = { roomId: string };

type MessageData = {
  message: string;
  user: string;
  profileImage: string;
  time: string;
  roomId: string;
};

const ChatBox: React.FC<ChatBoxProps> = ({ roomId }) => {
  const [username, setUserName] = useState('');
  const [chatActive, setChatActive] = useState(false);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const { data } = useQuery<user>('user', fetchUser);

  const [recoilMessages, setRecoilMessages] = useRecoilState(
    ChatMessagesAtom(roomId),
  );

  useEffect(() => {
    // roomId가 바뀔 때 로컬 스토리지에서 채팅 불러오기
    const savedChat = JSON.parse(localStorage.getItem(`chat-${roomId}`) || '[]');
    setMessages(savedChat);
  
    const handleReceivedMessage = (message: MessageData) => {
      // 메시지 추가
      setMessages((prevMessages: MessageData[]) => [...prevMessages, message]);
      // Recoil 상태 업데이트
      setRecoilMessages((prevMessages: MessageData[]) => [...prevMessages, message]);
  
      // 로컬 스토리지에도 저장
      const currentChat = [...savedChat, message]; // 여기서도 savedChat을 그대로 사용
      localStorage.setItem(`chat-${roomId}`, JSON.stringify(currentChat));
    };
  
    socket.on('received-message', handleReceivedMessage);
  
    return () => {
      socket.off('received-message', handleReceivedMessage);
    };
  }, [roomId]);  // 의존성 배열에서 savedChat을 제거


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const now = new Date(Date.now());
    const time = `${now.getHours()}:${now.getMinutes()}`;

    const messageData = {
      message: newMessage,
      user: data?.nickname,
      profileImage:data?.profileImage,
      time: time,
      uuid: roomId,
    };

    newMessage !== ''
      ? socket.emit('send-message', messageData)
      : alert('메세지를 입력해주세요');
    setNewMessage('');
  };

  return (
    <Container>
      <ChatImg src={공지사진} />
      <ChatList>
        {messages.map((message, index) => {
          return <Chat key={index} message={message} />;
        })}
      </ChatList>
      {roomId}
      <ChatForm onSubmit={handleSubmit}>
        <UserInput
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        ></UserInput>
        <SendButton type="submit">
          <img src={send} />
        </SendButton>
      </ChatForm>
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
