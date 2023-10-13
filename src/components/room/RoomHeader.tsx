import styled from 'styled-components';

type Props = {};

function RoomHeader({}: Props) {
  
  return (
    <HeaderBG>
      <RoomName>방제</RoomName>
      
      
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



export default RoomHeader;
