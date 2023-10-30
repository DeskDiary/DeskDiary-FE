import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import send from '../../../../images/send.svg';
import 공지사진 from '../../../../images/공지.png';
import Chat from './Chat';
import { fetchUser } from '../../../../axios/api';
import { useQuery } from 'react-query';
import socket from '../../socketInstance';

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
  const [newMessage, setNewMessage] = useState('');
  const [allChatList, setAllChatList] = useState<AllChatItem[]>([]);
  const [isStartButton, setIsStartButton] = useState(true);
  // const historyRoom = getRoomCookie('room');
  // const [roomCookie, setRoomCookie] = useState<string>('');

  const { data } = useQuery<user>('chatUser', fetchUser, {
    staleTime: Infinity, // 캐시 시간을 무한대로 설정
  });

  // 연결이 버튼
  const restartSocket = () => {
    socket.emit(
      'joinRoom',
      { nickname: data?.nickname, uuid: roomId, img: data?.profileImage },
      (response: any) => {
        // 서버로부터의 응답을 여기서 처리
        if (response.success) {
          console.log(
            '방에 성공적으로 참여했어!✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨',
          );
        } else {
          console.log('방 참여 실패😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭');
        }
      },
    );

    setIsStartButton(false);
  };

  if (!localStorage.getItem('room')) {
    localStorage.setItem('room', 'room');
  }

  const historyRoom = localStorage.getItem('room')

  console.log('historyRoom==="room"', historyRoom==="room")

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
      setAllChatList(prevAllChatList => [
        ...prevAllChatList,
        { type: 'new-user', data: hiUser },
      ]);
      console.log('🥰새로 들어온 유저', hiUser);
    });

    socket.on('left-user', (byeUser: string) => {
      setAllChatList(prevAllChatList => [
        ...prevAllChatList,
        { type: 'left-user', data: byeUser },
      ]);
      console.log('😭나간 유저', byeUser);
    });

    console.log('소켓연결');

    return () => {
      socket.off('user-list');
      socket.off('left-user');
    };
  }, [socket]);

  const chatListRef = useRef<HTMLDivElement>(null); // ref 생성

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight; // 스크롤을 아래로 이동
    }
  }, [allChatList]); // allChatList가 업데이트될 때마다 실행

  return (
    <Container>
      <ChatImg src={공지사진} />
      <ChatList ref={chatListRef}>
        {allChatList.map((chat, index) => {
          if (chat.type === 'message') {
            return <Chat key={index} message={chat.data} />;
          } else if (chat.type === 'new-user') {
            return (
              <Message key={index}>
                <span>{chat.data}</span> 님이 입장하셨습니다.
              </Message>
            );
          } else if (chat.type === 'left-user') {
            return (
              <Message key={index}>
                <span>{chat.data}</span> 님이 나가셨습니다.
              </Message>
            );
          }
        })}
      </ChatList>
      <ChatUnder>
        {historyRoom==="room" ? (
          <ChatForm onSubmit={handleSubmit}>
            <UserInput
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
            ></UserInput>
            <SendButton type="submit">
              <img src={send} />
            </SendButton>
          </ChatForm>
        ) : (
          <button type="button" onClick={restartSocket}>
            채팅 시작하기
          </button>
        )}
      </ChatUnder>
    </Container>
  );
};

const ChatUnder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;

  > button {
    background-color: var(--gray-09);
    border: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    font-size: 20px;
    color: white;
  }
`;

const Message = styled.div`
  margin: 0 auto;
  background-color: var(--gray-08);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  color: var(--gray-05);
  > span {
    color: white;
  }
`;

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
  width: 100%;
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

  width: 96%;
  min-height: calc(100% - 145px);
  border-left: 1px solid var(--gray-07);
  position: relative;

  /* 스크롤바 트랙(배경) 디자인 */
  ::-webkit-scrollbar-track {
    background: rgba(0, 197, 255, 0);
  }

  /* 스크롤바 핸들 디자인 */
  ::-webkit-scrollbar-thumb {
    background: var(--gray-07);
    border-radius: 10px;
  }

  /* 스크롤바 핸들 호버 상태 */
  ::-webkit-scrollbar-thumb:hover {
    background: var(--gray-06);
  }

  /* 스크롤바의 넓이 */
  ::-webkit-scrollbar {
    width: 7px;
    height: 5px;
  }
`;

export default ChatBox;
