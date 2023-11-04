import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { blue, orange, purple, yellow } from '../../../images/character';
import { RoomInfo } from '../../../recoil/RoomAtom';

type Props = {};


function RoomHeader({}: Props) {

  const [roomInfo, setRoomInfo] = useRecoilState(RoomInfo);
  // console.log('헤더',roomInfo) 
  return (
    <HeaderBG>
      <RoomName>{roomInfo.title}</RoomName>
      <IconDiv>
        <img src={yellow} alt="" />
        <img src={orange} alt="" />
        <img src={purple} alt="" />
        <img src={blue} alt="" />

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
  display: flex;
  width: 350px;
  height: 100%;
  align-items: end;
  gap: 24px;
  justify-content: space-around;
  img {
    width: 50px;
    height: 50px;
  }
`;

const RoomName = styled.p`
  font-size: 18px;
  text-align: left;
  margin-left: 70px;
  margin-right: auto;
  width: 1000px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;


export default RoomHeader;
