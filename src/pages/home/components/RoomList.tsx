import React, { useEffect, useState, useRef } from 'react';
import { useQuery, useQueryClient } from 'react-query';
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
import { act } from '@testing-library/react';

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
  const [roomList, setRoomList] = useState<any[]>([]);
  const [num, setNum] = useState(1);
  const queryClient = useQueryClient();

  const target = useRef<HTMLDivElement | null>(null); // 타입 명시


  useEffect(() => {
    observer.observe(target.current!);
  }, []);

  const options = {
    threshold: 1.0,
  };

  const callback = (entries: IntersectionObserverEntry[]) => {
    if (target.current) {
      target.current.innerText += "관측되었습니다";
    }
  };
  

  const observer = new IntersectionObserver(callback, options);

  
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
    [fetchName, show, sort], // 쿼리 키를 배열로 만들어 fetchName, show, sort 추가
    async () => {
      const fetchFunc =
        fetchFunctions[fetchName as keyof typeof fetchFunctions];
      if (fetchFunc) {
        const result = await fetchFunc(num);
        setNum(num + 1);
        return result;
      } else {
        throw new Error('Invalid fetchName');
      }
    },
    {},
  );
  console.log(fetchName, data);
  useEffect(() => {
    if (!data) {
      setRoomList([]);
    } else if (
      fetchName === 'fetchRoomPopular' ||
      fetchName === 'fetchRoomLatest' ||
      fetchName === 'fetchRoomTopPopular' ||
      fetchName === 'fetchRoomTopLatest'
    ) {
      setRoomList(data as room[]); // data를 room[] 형식으로 형 변환
    } else if ('QueryResults' in data) {
      const dataWithType = data as { myCursor?: number; QueryResults: room[] };
      setRoomList([...roomList, ...(data.QueryResults as room[])]); // data.QueryResults를 room[] 형식으로 형 변환
    }
  }, [data]);

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
      <div style={{ height: "100px", backgroundColor: "grey" }} ref={target}>
        target
      </div>
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

export default RoomList;
