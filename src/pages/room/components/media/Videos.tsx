import React, { useEffect } from 'react';
import {
  IAgoraRTCRemoteUser,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  AgoraVideoPlayer,
} from 'agora-rtc-react';
import DefaultScreen from './DefaultScreen';
import styled from 'styled-components';
import socket from '../../socketInstance';
import { RoomUserList } from '../../../../recoil/RoomAtom';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { fetchUser } from '../../../../axios/api';
import {yellow} from '../../../../images/character'

type VideosProps = {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  volumes: any;
};

type UserListPayload = {
  nickname: string;
  userListArr: { nickname: string; img: string; userId: number }[];
};

const Videos: React.FC<VideosProps> = ({ users, tracks, volumes }) => {
  const [roomUserList, setRoomUserList] = useRecoilState(RoomUserList);

  // userId를 사용해서 userList에서 닉네임 찾기
  const getNicknameByUserId = (userId: number) => {
    const user = roomUserList.find(user => user.userId === userId);
    return user ? user.nickname : null;
  };

  // 볼륨 레벨에 따라서 색상을 결정하는 함수
  const getBorderColorByVolume = (volume: number) => {
    // if (volume > 70) return 'red';
    // if (volume > 50) return 'orange'; // 볼륨이 5 이상이면 빨간색
    if (volume > 18) return 'green'; // 볼륨이 3 이상이면 주황색
    return 'var(--gray-09)'; // 그 외는 녹색
  };

  // 본인의 오디오 트랙 ID를 가져옴
  const myAudioTrackId = tracks[0].getTrackId();

  // 나가고 들어온 유저 닉네임 받아오기
  useEffect(() => {
    socket.on('user-list', (payload: UserListPayload) => {
      const { nickname, userListArr } = payload;
      setRoomUserList(userListArr);
      // console.log('리코일', roomUserList);
    });

    return () => {
      socket.off('user-list');
      socket.off('left-user');
    };
  }, [socket]);

  const { data, isLoading, error } = useQuery('cam-user', fetchUser);
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생</div>;
  }

  return (
    <Container>
      <Video border={getBorderColorByVolume(volumes[myAudioTrackId] || 0)}>
        <AgoraVideoPlayer
          style={{ height: '300px', width: '400px', backgroundColor: 'blue' }}
          className="video"
          videoTrack={tracks[1]}
        />
        <Nickname>{data.nickname}</Nickname>
      </Video>

      {users.length > 0 &&
        users.map(user => {
          if (user.videoTrack) {
            const volumeLevel = volumes[user.uid] || 0; // 기본 볼륨 값은 0으로 설정
            const borderColor = getBorderColorByVolume(volumeLevel);
            const nickname = getNicknameByUserId(+user.uid);
            return (
              <Video key={user.uid} border={borderColor}>
                <AgoraVideoPlayer
                  style={{
                    height: '300px',
                    width: '400px',
                    display: 'inline',
                    backgroundColor: 'black',
                  }}
                  className="video"
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
                {nickname && <Nickname type="button">{nickname}</Nickname>}
              </Video>
            );
          } 
          else {
            const nickname = getNicknameByUserId(+user.uid);
            return (
              <Video border={''}>
                <DefaultScreen key={user.uid} />
                {nickname && <Nickname type="button">{nickname}</Nickname>}
              </Video>
            );
          }
        })}
    </Container>
  );
};

const Nickname = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  z-index: 10;
  background-color: var(--gray-09);
  padding: 0 10px;
  display: flex;
  align-items: center;
  height: 35px;
  border-radius: 10px;
  border: none;
  cursor: auto;
`;

const Video = styled.div<{ border: string }>`
  width: 400px;
  height: 300px;
  border-radius: 15px;
  overflow: hidden;
  border: 3px solid ${({ border }) => border};
  position: relative;
  background-color: black;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 20px;
  align-items: center;
  justify-content: center;

  overflow: scroll;
  overflow-y: hidden;
  align-items: center;
  margin-bottom: 100px;

  @media (max-width: 1700px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export default Videos;
