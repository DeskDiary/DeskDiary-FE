import React, { ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import Picture from '../../../images/Picture.png';

type CreateRoomProps = {
  setOpenCreateRoom: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateRoomModal: React.FC<CreateRoomProps> = ({ setOpenCreateRoom }) => {
  const [isStudyActive, setIsStudyActive] = useState(false);
  const [isHobbyActive, setIsHobbyActive] = useState(false);
  const [inputText, setInputText] = useState('');

  const [selectedUserCount, setSelectedUserCount] = useState<number | null>(
    null,
  );

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const onClickStudy = () => {
    setIsStudyActive(!isStudyActive);
    if (isHobbyActive === true) {
      setIsHobbyActive(false);
    }
  };

  const onClickHobby = () => {
    setIsHobbyActive(!isHobbyActive);
    if (isStudyActive === true) {
      setIsStudyActive(false);
    }
  };

  const handleUserCountClick = (count: number) => {
    setSelectedUserCount(count);
  };

  return (
    <Container>
      <BackGround />
      <ModalContent column justify="start">
        <Title>방 만들기</Title>
        <Thumbnanil column gap="11px">
          <ThumbnailImg src={Picture}></ThumbnailImg>
          <ThumbnailText>썸네일 등록</ThumbnailText>
        </Thumbnanil>

        <Content column gap="15px">
          <Group column align="start">
            <Label>방 이름</Label>
            <RoomTitle />
          </Group>

          <Group column align="start">
            <Label>목적 정하기</Label>
            <CategoryGroup gap="16px">
              <Category
                type="button"
                onClick={onClickStudy}
                isActive={isStudyActive}
              >
                스터디
              </Category>
              <Category
                type="button"
                onClick={onClickHobby}
                isActive={isHobbyActive}
              >
                취미
              </Category>
            </CategoryGroup>
          </Group>

          <Group column align="start">
            <Label>인원설정 (최대 4인 가능)</Label>
            <CategoryGroup gap="16px">
              {[1, 2, 3, 4].map(i => (
                <MaxUser
                  key={i}
                  onClick={() => handleUserCountClick(i)}
                  isActive={i === selectedUserCount}
                >
                  {i}인
                </MaxUser>
              ))}
            </CategoryGroup>
          </Group>

          {/* <Group column align="start">
            <Label>상세 목적 설정 (최대 3개 설정 가능)</Label>
            <RoomTitle />
            <Tags>
              <Tag></Tag>
            </Tags>
          </Group> */}

          <Group column align="start">
            <Label>엉덩이들의 유의사항</Label>
            <Precautions
              value={inputText}
              onChange={handleInputChange}
              placeholder="사용자 입력을 받으려면 여기에 입력하세요."
              style={{
                width: '100%',
                height: '100px',
                padding: '10px',
                borderRadius: '5px',
              }}
            />
          </Group>
        </Content>

        <Button column gap="8px">
          <CreateRoomButton>방만들기</CreateRoomButton>
          <CancleButton onClick={() => setOpenCreateRoom(false)}>
            취소
          </CancleButton>
        </Button>
      </ModalContent>
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

/* <{ isActive: boolean }>` */
/* background-color: ${props => (props.isActive ? 'black' : '#6e6e6e')}; */
// const MaxUser = styled.button`
//   width: 60px;
//   height: 50px;

//   font-size: 24px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 123.5%;
//   letter-spacing: 0.25px;
//   color: white;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: none;
// `;

const Precautions = styled.textarea`
  width: calc(100% - 20px);
  height: 200px;
  resize: none;
  padding: 10px;
  border-radius: 5px;
  white-space: pre-line; /* 엔터를 줄 바꿈으로 해석합니다. */
  overflow-y: auto; /* 내용이 넘치면 스크롤바가 표시되도록 설정할 수 있습니다. */
`;
const MaxUser = styled.button<{ isActive: boolean }>`
  width: 60px;
  height: 50px;
  background-color: ${props => (props.isActive ? 'black' : '#6e6e6e')};
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 123.5%;
  letter-spacing: 0.25px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;

const CategoryGroup = styled(FlexContainer)``;

const Category = styled.button<{ isActive: boolean }>`
  width: 166px;
  height: 50px;
  background-color: ${props => (props.isActive ? 'black' : '#6e6e6e')};
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 123.5%;
  letter-spacing: 0.25px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;

const Content = styled(FlexContainer)`
  display: flex;
  width: 654px;
  margin-top: 14px;
`;

const Label = styled.div`
  padding: 10px 0;
`;

const RoomTitle = styled.input`
  width: calc(100% - 30px);
  height: 18px;
  padding: 15px;

  border-radius: 5px;
  border: 1px solid var(--gray-07, #757575);
  background: #fff;
`;

const Group = styled(FlexContainer)`
  width: 100%;
`;

const Thumbnanil = styled(FlexContainer)`
  width: 234px;
  height: 140px;
  border-radius: 10px;
  background-color: #6e6e6e;
`;

const ThumbnailText = styled.div`
  color: #fefefe;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 123.5%; /* 29.64px */
  letter-spacing: 0.25px;
`;

const ThumbnailImg = styled.img`
  width: 33px;
  height: 33px;
`;

const Title = styled.div`
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: 123.5%; /* 44.46px */
  letter-spacing: 0.25px;

  margin-top: 36px;
  margin-bottom: 22px;
  height: 44px;
`;

const Button = styled(FlexContainer)`
  margin-bottom: 16px;
  margin-top: auto;
`;

const CreateRoomButton = styled.button`
  width: 510px;
  height: 50px;
  border: none;
  background-color: rgb(110, 110, 110);
  cursor: pointer;
  color: white;
  font-size: 24px;
`;

const CancleButton = styled.button`
  width: 510px;
  height: 50px;
  border: none;
  background-color: rgba(110, 110, 110, 0);
  cursor: pointer;
  font-size: 24px;
`;

const BackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(
    5px
  ); // 블러 정도 설정. 숫자를 조절해서 블러 정도를 변경할 수 있어.
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled(FlexContainer)`
  width: 810px;
  height: 948px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  z-index: 50;
  position: absolute;
`;

const Container = styled(FlexContainer)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
`;

export default CreateRoomModal;
