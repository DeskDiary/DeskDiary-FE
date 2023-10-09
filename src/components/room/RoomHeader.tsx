import styled from 'styled-components';

type Props = {};

function RoomHeader({}: Props) {
  return (
    <HeaderBG>
      <RoomName>방제</RoomName>
      <Time>
        <p>Time</p>
        <p>01:12:34</p>
      </Time>
      <RoomOut>방나가기</RoomOut>
    </HeaderBG>
  );
}

const HeaderBG = styled.div`
  background: rgba(183, 183, 183, 1);
  height: 96px;
  display: flex;
  align-items: center;
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
`;

const Time = styled.div`
  width: 309px;
  height: 96px;
  left: 988px;
  display: flex;
  font-family: Inter;
  font-size: 36px;
  font-weight: 700;
  line-height: 54px;
  letter-spacing: -0.01em;
  text-align: left;
  gap: 20px;
  align-items: center;
`;

const RoomOut = styled.div`
  width: 143px;
  height: 96px;
  left: 1297px;
  background: rgba(147, 147, 147, 1);
  text-align: center;
`;

export default RoomHeader;
