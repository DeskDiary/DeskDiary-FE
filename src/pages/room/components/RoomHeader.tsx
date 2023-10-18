import styled from 'styled-components';
import 공지사진 from '../../../images/공지.png';
import 알림사진 from '../../../images/알림.png';
import 음표사진 from '../../../images/음표.png';

type Props = {};

function RoomHeader({}: Props) {
  return (
    <HeaderBG>
      <RoomName>방제</RoomName>
      <IconDiv>
        <img src={알림사진} alt="" />
        <img src={음표사진} alt="" />
        <img src={공지사진} alt="" />
      </IconDiv>
    </HeaderBG>
  );
}

const HeaderBG = styled.div`
  background: var(--gray-09, #424242);
  height: 96px;
  display: flex;
  align-items: center;
`;

const IconDiv = styled.div`
  width: 350px;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 24px;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid var(--primary-01, rgba(0, 197, 255, 1));
    padding: 10px;
    overflow: inherit;
  }
`;

const RoomName = styled.p`
  font-family: Inter;
  font-size: 36px;
  font-weight: 700;
  line-height: 54px;
  letter-spacing: -0.01em;
  text-align: left;
  margin-left: 70px;
  margin-right: auto;
  width: 200px;
  background-color: aqua;
`;

export default RoomHeader;
