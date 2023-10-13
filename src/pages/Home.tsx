import { Link } from 'react-router-dom';
import Goal from '../components/layout/Goal';

const Home = () => {

  const createRoomButton = () => {
    return <div>방만들기</div>
  }

  return (
    <div>
        <Link to={`/auth/login`}>LOGIN</Link>
        <br />
        <Link to={`/auth/join`}>JOIN</Link>
        <br />
        <Link to={`/room`}>ROOM 입장</Link>
        <br />
        <div onClick={createRoomButton}>방 만들기</div>
        <Goal />
    </div>
  );
};
export default Home;
