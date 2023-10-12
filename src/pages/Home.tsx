import { Link } from 'react-router-dom';
import Goal from '../components/layout/Goal';

const Home = () => {

  const createRoomButton = () => {
    return <div>방만들기</div>
  }

  return (
    <div>
        <Link to={`/login`}>LOGIN</Link>
        <br />
        <Link to={`/join`}>JOIN</Link>
        <br />
        <Link to={`/room`}>ROOM 입장</Link>
        <br />
        <div onClick={createRoomButton}>방 만들기</div>
        <Goal />
    </div>
  );
};
export default Home;
