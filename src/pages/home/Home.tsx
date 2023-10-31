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
      <Body>
        {/* <MainTop /> */}

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
      </Body>
    </Container>
  );
};

const Body = styled.div``

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;



  width: 100vw;
  min-height: 100vh;
  background-color: #e8f1ff;

  ${Body} {
    /* margin-top: 100px; */
    width: 1200px;
  }
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
