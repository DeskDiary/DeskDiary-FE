import { useEffect } from 'react';

import styled from 'styled-components';

import { useNavigate } from 'react-router';
import { getCookie } from '../../auth/cookie';
import userIntro from '../../images/main/userIntro.svg';
import { Goal, NonUserIntro } from './components';
import RoomList from './components/RoomList';

const Home = () => {
  const navigate = useNavigate();

  console.log('홈화면 렌더링');
  const token = getCookie('token');

  useEffect(() => {
    const visited = window.sessionStorage.getItem('visited');
    if (visited === null) {
      navigate('/lending');
    }
    console.log(visited);
  }, []);

  useEffect(() => {
    console.log('⭕렌더링');
  }, []);

  return (
    <Container>

        <Info>
          {token ? (
            <User>
              <Goal />
              <img src={userIntro} alt="user " />
            </User>
          ) : (
            <NonUserIntro />
          )}
        </Info>

        <RoomList label="엉덩이들이 많이 찾는 TOP 10" show="fetchRoomTop" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 1200px;
  min-height: calc(100vh - 120px);
  background-color: #e8f1ff;
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 100%;
  width: 100%;
  > Img {
    width: 50%;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 190px;
`;

export default Home;
