import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  fetchHobbyLatest,
  fetchHobbyPopular,
  fetchRoomLatest,
  fetchRoomPopular,
  fetchRoomTopLatest,
  fetchRoomTopPopular,
  fetchStudyLatest,
  fetchStudyPopular,
  fetchUser,
} from '../../../axios/api';
import RoomCard from './RoomCard';
import { useRecoilState } from 'recoil';
import axios from 'axios';

type RoomListProps = {
  label: string;
  show?: string;
};

const fetchFunctions = {
  fetchRoomPopular: fetchRoomPopular,
  fetchRoomLatest: fetchRoomLatest,
  fetchRoomTopPopular: fetchRoomTopPopular,
  fetchRoomTopLatest: fetchRoomTopLatest,
  fetchStudyPopular: fetchStudyPopular,
  fetchHobbyPopular: fetchHobbyPopular,
  fetchStudyLatest: fetchStudyLatest,
  fetchHobbyLatest: fetchHobbyLatest,
};

const RoomList: React.FC<RoomListProps> = ({ label, show }) => {
  const [isPopular, setIsPopular] = useState(true);
  const [sort, setSort] = useState('Popular');
  const targetRef = useRef(null);

  const [roomList, setRoomList] = useState<room[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && !isLoading) {
      // Target 엘리먼트가 화면에 나타나면 데이터를 추가로 불러오기
      setIsLoading(true);

      // 여기에서 추가 데이터를 불러오는 함수 호출 (예: fetchMoreData())
    }
  };

  useEffect(() => {
    // IntersectionObserver 초기화
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // 엘리먼트가 화면에 10% 이상 나타날 때 콜백 호출
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // 컴포넌트 언마운트 시 Observer 해제
    return () => observer.disconnect();
  }, []);


  const changePopular = (value: boolean) => {
    setIsPopular(value);
    if (value) {
      setSort('Popular');
    } else {
      setSort('Latest');
    }
  };

  let fetchName = show + sort;

  const { data } = useQuery<room[], Error>(
    fetchName, // 쿼리 키를 배열로 만들어 fetchName, show, sort 추가
    async () => {
      const fetchFunc =
        fetchFunctions[fetchName as keyof typeof fetchFunctions];
      if (fetchFunc) {
        const result:room[] = await fetchFunc(0);
        return result;
      } else {
        throw new Error('Invalid fetchName');
      }
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: 10000,
      refetchIntervalInBackground: true,
      retry: false, // 새로고침이 필요 없을 때 에러를 던지므로, 재시도하지 않게 함
    },
  );

  useEffect(() => {
    setRoomList(data!);
  }, [data])

  useEffect(() => {
    if (isPopular) {
      setSort('Popular');
    } else {
      setSort('Latest');
    }
  }, [isPopular]);

  return (
    <List>
      <ListInfo>
        <ListTitle>{label}</ListTitle>
        <Categorys>
          <Category
            cute={`${sort}`}
            me={'Popular'}
            onClick={() => changePopular(true)}
          >
            인기순
          </Category>
          <Category
            cute={`${sort}`}
            me={'Latest'}
            onClick={() => changePopular(false)}
          >
            최신순
          </Category>
        </Categorys>
      </ListInfo>

      <JoinedRooms>
        {roomList?.map(room => {
          return <RoomCard key={room.uuid} room={room} fetch={fetchName} />;
        })}
      </JoinedRooms>
      <Target ref={targetRef}></Target>
    </List>
  );
};

const ListInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Categorys = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
`;

const Category = styled.button<{ cute: string; me: string }>`
  font-size: 14px;
  font-weight: 500;
  width: 50px;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-bottom: 2px;

  color: ${props =>
    props.cute === props.me ? 'var(--primary-01)' : 'var(--gray-07)'};
  border-bottom: 1px solid
    ${props => (props.cute === props.me ? 'var(--primary-01)' : 'none')};

  &:hover {
    color: var(--primary-01);
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  margin: 60px 0;
  height: 100%;
  width: 100%;

  @media (max-width: 1400px) {
    width: 1000px;
  }
  @media (max-width: 1200px) {
    width: 800px;
  }
  @media (max-width: 768px) {
    width: 500px;
  }
`;

const ListTitle = styled.div`
  margin-bottom: 16px;
  font-size: 24px;
`;

const JoinedRooms = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  width: 1200px;

  @media (max-width: 1400px) {
    width: 1000px;
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1200px) {
    width: 800px;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    width: 500px;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Target = styled.div`
  width: 50vw;
  height: 0px;
  border: 1px solid tomato;
`;

export default RoomList;
