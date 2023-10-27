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

type ChatBoxProps = { roomId: string; userCount: number };

type MessageData = {
  message: string;
  nickname: string;
  img: string;
  time: string;
  roomId: string;
};

type AllChatItem =
  | { type: 'message'; data: MessageData }
  | { type: 'new-user'; data: string }
  | { type: 'left-user'; data: string };

const ChatBox: React.FC<ChatBoxProps> = ({ roomId, userCount }) => {
  const [username, setUserName] = useState('');
  const [chatActive, setChatActive] = useState(false);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [allChatList, setAllChatList] = useState<AllChatItem[]>([]);
  const [hiUserNickname, setHiUserNickname] = useState('');
  const [byeUserNickname, setByeUserNickname] = useState('');

  const { data } = useQuery<user>('chatUser', fetchUser);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유저가 서버에게 메세지 보냄
    const messageData = {
      message: newMessage,
      nickname: data?.nickname,
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

  // 서버에서 유저애개 메세지를 보냄
  useEffect(() => {
    socket.on('msgToClient', (message: MessageData) => {
      console.log('받은 메시지:', message); // 이 부분을 추가해줘!
      setMessages(prevMessages => [...prevMessages, message]);
      setAllChatList(prevAllChatList => [
        ...prevAllChatList,
        { type: 'message', data: message },
      ]);
    });

    return () => {
      console.log('off');
      socket.off('msgToClient');
    };
  }, [socket]);

  // 나가고 들어온 유저 닉네임 받아오기
  useEffect(() => {
    socket.on('new-user', (hiUser: string) => {
      setHiUserNickname(hiUser);
      setAllChatList(prevAllChatList => [
        ...prevAllChatList,
        { type: 'new-user', data: hiUser },
      ]);
      console.log('🥰새로 들어온 유저', hiUser);
    });

    socket.on('left-user', (byeUser: string) => {
      setByeUserNickname(byeUser);
      setAllChatList(prevAllChatList => [
        ...prevAllChatList,
        { type: 'left-user', data: byeUser },
      ]);
      console.log('😭나간 유저', byeUser);
    });

    console.log('소켓연결')

    return () => {
      socket.off('user-list');
      socket.off('left-user');
    };
  }, [userCount]);

  return (
    <Container>
      <ChatImg src={공지사진} />
      <ChatList>
        {/* {messages.map((message, index) => {
          return <Chat key={index} message={message} />;
        })}
        {socketUserList
          ? Object.values(socketUserList).map((user, index) => (
              <div key={index}>{user.nickname} 님이 입장하셨습니다.</div>
            ))
          : 'undefined'} */}
        {allChatList.map((chat, index) => {
          if (chat.type === 'message') {
            return <Chat key={index} message={chat.data} />;
          } else if (chat.type === 'new-user') {
            return <Message key={index}>{`${chat.data} 님이 입장하셨습니다.`}</Message>;
          } else if (chat.type === 'left-user') {
            return <Message key={index}>{`${chat.data} 님이 나가셨습니다.`}</Message>;
          }
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
    </Container>
  );
};

const Message = styled.div`
margin: 0 auto;
background-color: var(--gray-05);
padding: 5px;
border-radius: 10px;
font-weight: 500;
`

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

  min-height: calc(100% - 145px);
  width: calc(100% - 40px);
  padding: 20px;
  border-bottom: 1px solid var(--gray-05);
  overflow: scroll;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 100%;
  min-height: calc(100% - 145px);
  border-left: 1px solid var(--gray-07);
`;

export default ChatBox;
