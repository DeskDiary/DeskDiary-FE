import React from 'react';
import styled from '@emotion/styled';
import Picture from '../../../images/Picture.png';

type CreateRoomProps = {};

const CreateRoomModal: React.FC<CreateRoomProps> = () => {
  return (
    <Container>
      <BackGround />
      <ModalContent column justify="start">
        <Title>방 만들기</Title>
        <Thumbnanil column gap="11px">
          <ThumbnailImg src={Picture}></ThumbnailImg>
          <ThumbnailText>썸네일 등록</ThumbnailText>
        </Thumbnanil>

        <Content column gap="8px">
          <Group column align="start">
            <Label>방 이름</Label>
            <RoomTitle />
          </Group>

          <Group column align="start">
            <Label>목적 정하기</Label>
            <CategoryGroup gap="16px">
              <Category>스터디</Category>
              <Category>취미</Category>
            </CategoryGroup>
          </Group>

          <Group column align="start">
            <Label>상세 목적 설정 (최대 3개 설정 가능)</Label>
            <RoomTitle />
            {/* <Tags>
              <Tag></Tag>
            </Tags> */}
          </Group>
        </Content>

        <Button column gap="8px">
          <CreateRoomButton>방만들기</CreateRoomButton>
          <CancleButton>취소</CancleButton>
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

const CategoryGroup = styled(FlexContainer)``;

const Category = styled.div`
  display: flex;
  width: 166px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: #6e6e6e;

  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 123.5%; /* 29.64px */
  letter-spacing: 0.25px;
  color: white;
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

const Button = styled(FlexContainer)``;

const CreateRoomButton = styled.button`
  width: 510px;
  height: 50px;
  border: none;
  background-color: rgb(110, 110, 110);
  color: white;
`;

const CancleButton = styled.button`
  width: 510px;
  height: 50px;
  border: none;
  background-color: rgba(110, 110, 110, 0);
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
  top: 66px;
  left: 555px;
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
