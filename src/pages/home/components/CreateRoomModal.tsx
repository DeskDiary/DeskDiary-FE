import React, { ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import upload from '../../../images/main/upload.svg';
import { Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import { RoomAtom, RoomUUIDAtom } from '../../../recoil/RoomAtom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../../auth/cookie';

import { study, hobby } from '../../../images';
import BasicPrecautions from './BasicPrecautions';
import socket from '../../room/components/chat/socketInstance';

type CreateRoomProps = {
  setOpenCreateRoom: React.Dispatch<React.SetStateAction<boolean>>;
  user: user
};

// 썸네일 등록 버튼 스타일
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CreateRoomModal: React.FC<CreateRoomProps> = ({ setOpenCreateRoom, user }) => {
  const token = getCookie('token');

  const [room, setRoom] = useRecoilState(RoomAtom);
  const [isStudyActive, setIsStudyActive] = useState(false);
  const [isHobbyActive, setIsHobbyActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const categories = ['study', 'hobby'];
  const activeStates = { study: isStudyActive, hobby: isHobbyActive };

  const [maxUser, setMaxUser] = useState(1);

  const [selectedUserCount, setSelectedUserCount] = useState<number | null>(
    null,
  );


  const navigate = useNavigate();

  // 여기부터
  const [formData, setFormData] = useRecoilState(RoomAtom);

  const updateFormData = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const onChangeCategory = (category: string) => {
    if (category === 'study') {
      setIsStudyActive(true);
      setIsHobbyActive(false);
    } else if (category === 'hobby') {
      setIsStudyActive(false);
      setIsHobbyActive(true);
    }

    updateFormData('category', category);
  };

  const handleUserCountClick = (count: number) => {
    setSelectedUserCount(count);
    setMaxUser(count);
    updateFormData('count', count);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);

    if (file) {
      setFile(file); // 바로 파일 객체 저장
    }
  };

  const handleJoinRoom = async (uuid:string) => {
    try {
      const token = getCookie('token');
      console.log('조인룸 토큰', token);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL!}/room/${uuid}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);

      socket.emit('joinRoom', {
        nickname: user.nickname,
        uuid: uuid,
        img: user.profileImage,
      }, (response:any) => {
        // 서버로부터의 응답을 여기서 처리
        if (response.success) {
          console.log('방에 성공적으로 참여했어!✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
        } else {
          console.log('방 참여 실패😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭');
        }
      });
    
      socket.on('new-user', (nickname) => {
        console.log('새로운 유저가 방에 참석:✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨', nickname);
      });

      navigate(`/room/${uuid}`);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // FormData 객체 생성
    const formData = new FormData();

    if (file) {
      formData.append('file', file);
    }

    formData.append('title', room.title);
    formData.append('maxHeadcount', maxUser.toString());
    formData.append('category', isStudyActive ? 'study' : 'hobby');
    formData.append('note', room.note);

    try {
      console.log('try');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // JWT 토큰을 여기에 삽입해주세요
        },
      };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL!}/room`,
        formData,
        config,
      );

      // 성공시 로직
      if (response.data.createdRoom) {
        console.log('성공', response.data);
        alert('방만들기 성공!');
        handleJoinRoom(response.data.createdRoom.uuid)
        // console.log(response.data.createdRoom.uuid)
      } else {
        console.log('실패ddzz', response.data);
      }
    } catch (error) {
      console.log('방 만들기 실패', error);
    }
  };

  return (
    <Container onSubmit={onSubmitRoom}>
      <BackGround />

      <ModalContent>
        <Title>방 만들기</Title>
        <Thumbnail>
          {file ? <ThumbnailImg src={URL.createObjectURL(file)} /> : <img src={upload}/>}
        </Thumbnail>
        <ThumbnailButtonGroup>
          <Button
            component="label"
            sx={{
              color: 'gray',
              '&:hover': {
                backgroundColor: 'initial', // 여기서 'initial' 대신 원래 배경색을 넣어도 돼
                boxShadow: 'none', // 그림자 효과 제거
              },
            }}
          >
            썸네일 등록
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
          </Button>

          <button onClick={() => setFile(null)}>삭제</button>
        </ThumbnailButtonGroup>

        <Content>
          <Group>
            <Label>방 이름</Label>
            <RoomTitle
              type="text"
              // onChange={e => setRoom({ ...room, title: e.target.value })}
              onChange={e => updateFormData('title', e.target.value)}
            />
          </Group>

          <Group>
            <Label>목적 정하기</Label>

            <CategoryGroup>
              {categories.map((category, index) => (
                <Category
                  key={index}
                  type="button"
                  onClick={() => onChangeCategory(category)}
                  isActive={activeStates[category as 'study' | 'hobby']}
                >
                  <CategoryImg
                    src={category === 'study' ? study : hobby}
                    isActive={activeStates[category as 'study' | 'hobby']}
                  ></CategoryImg>
                  {category === 'study' ? '스터디' : '취미'}
                </Category>
              ))}
            </CategoryGroup>
          </Group>

          <Group>
            <Label>인원설정 (최대 4인 가능)</Label>
            <CategoryGroup>
              {[1, 2, 3, 4, 5, 6, 7, 100].map((i, index) => (
                <MaxUser
                  key={index}
                  type="button"
                  onClick={() => handleUserCountClick(i)}
                  isActive={i === selectedUserCount}
                >
                  {i}인
                </MaxUser>
              ))}
            </CategoryGroup>
          </Group>
        </Content>

        <PrecautionsBox>
          <p>방 개설 시 유의 사항</p>
          <Box>
            <BasicPrecautions />

            <Precautions
              onChange={e => setRoom({ ...room, note: e.target.value })}
              placeholder="유의사항을 추가 해 주세요."
            />
          </Box>
        </PrecautionsBox>

        <ButtonGroup>
          <CreateRoomButton>방만들기</CreateRoomButton>
          <CancleButton type="button" onClick={() => setOpenCreateRoom(false)}>
            취소
          </CancleButton>
        </ButtonGroup>
      </ModalContent>
    </Container>
  );
};

const CategoryImg = styled.img<{ isActive: boolean }>`
  filter: grayscale(${props => (props.isActive ? '0%' : '100%')});
  width: 20px;
`;

const ThumbnailButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 20px;
`;

const ThumbnailImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Precautions = styled.textarea`
  width: 100%;
  height: 50px;
  resize: none;
  border: none;
  margin-top: 10px;

  white-space: pre-line; /* 엔터를 줄 바꿈으로 해석합니다. */
  overflow-y: auto; /* 내용이 넘치면 스크롤바가 표시되도록 설정할 수 있습니다. */
  &:focus {
    outline: none;
  }
`;

const MaxUser = styled.button<{ isActive: boolean }>`
  color: ${props => (props.isActive ? 'var(--primary-01)' : 'var(--gray-05)')};
  border: 2px solid
    ${props => (props.isActive ? 'var(--primary-01)' : 'var(--gray-05)')};

  border-radius: 50px;
  font-size: 16px;
  font-weight: 500;

  width: 40px;
  padding: 4px;
`;

const CategoryGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 11px;
`;

const Category = styled.button<{ isActive: boolean }>`
  padding: 7px 10px;
  width: 100px;
  font-size: 16px;
  color: ${props => (props.isActive ? 'var(--primary-01)' : 'var(--gray-05)')};
  display: flex;
  gap: 13px;
  justify-content: center;
  align-items: center;
  border: 2px solid
    ${props => (props.isActive ? 'var(--primary-01)' : 'var(--gray-05)')};
  border-radius: 100px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  display: flex;
  width: 400px;
  margin-top: 14px;
`;

const Label = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-07);
`;

const PrecautionsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  margin-top: 15px;
  > p {
    margin-right: auto;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 500;
    color: var(--gray-07);
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 5px;

  width: 400px;
  border: 1px solid var(--gray-07);
  border-radius: 10px;
  padding: 5px;
`;

const RoomTitle = styled.input`
  width: calc(100%);
  height: 40px;
  padding: 15px;
  font-size: 14px;
  font-weight: 500;

  border-radius: 5px;
  border: 1px solid var(--gray-07);
  background: #fff;
  &:focus {
    outline: none;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  width: 100%;
`;

const Thumbnail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 150px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
`;

const SampleImg = styled.img`
  width: 33px;
  height: 33px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 18px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 400px;
  margin-top: auto;
`;

const CreateRoomButton = styled.button`
  width: 195px;
  height: 50px;
  border: none;
  background-color: var(--primary-01);
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

const CancleButton = styled.button`
  width: 195px;
  height: 50px;
  border: 1px solid var(--primary-01);
  color: var(--primary-01);
  background-color: rgba(110, 110, 110, 0);
  font-size: 16px;
  font-weight: 600;
`;

const BackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(
    5px
  ); // 블러 정도 설정. 숫자를 조절해서 블러 정도를 변경할 수 있어.
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 600px;
  height: 800px;
  /* background-color: rgba(255, 255, 255, 0.8); */
  background-color: white;
  border-radius: 20px;
  z-index: 50;
  position: absolute;
  padding: 40px 0;
`;

const Container = styled.form`
  display: flex;
  flex-direction: col;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5000;
`;

export default CreateRoomModal;
