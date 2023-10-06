import styled from "@emotion/styled"
import RoomCamArea from "../components/room/RoomCamArea"
import RoomHeader from "../components/room/RoomHeader"

type Props = {}

const Room = (props: Props) => {
  return (
    <div>
      <RoomHeader />
      <Area>
        {/* 캠이 들어갈 곳 */}
        <CamAreaDiv>
          <RoomCamArea />
        </CamAreaDiv> 
        {/* 채팅이 들어갈 곳 */}
        <ChattingAreaDiv>채팅이 들어갈 곳</ChattingAreaDiv> 
      </Area>
      
    </div>
  )
}

const Area = styled.div`
  display: flex;
  height: calc(100vh - 96px);
`
const CamAreaDiv = styled.div`
  width: 70%;
  padding-top: 61px;
  margin-left: 40px;
  /* margin-right: 20px; */
`
const ChattingAreaDiv = styled.div`
  width: 30%;
  background-color: beige;
`

export default Room