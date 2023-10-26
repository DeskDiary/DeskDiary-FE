import React, { useEffect, useState } from 'react';
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
} from '../../../axios/api';
import RoomCard from './RoomCard';

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

  console.log('룸리스트렌더링')

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
        const result = await fetchFunc();
        return result;
      } else {
        throw new Error('Invalid fetchName');
      }
    },
    {
      staleTime: Infinity, // 캐시 시간을 무한대로 설정
    }
  );

  useEffect(() => {
    if (isPopular) {
      setSort('Popular');
    } else {
      setSort('Latest');
    }
  }, [isPopular]);

  useEffect(() => {

  }, [data])

  return (
    <List>
      <ListInfo>
        <ListTitle>{label}</ListTitle>
        <Categorys>
          <Category onClick={() => changePopular(true)}>인기순</Category>
          <Category onClick={() => changePopular(false)}>최신순</Category>
        </Categorys>
      </ListInfo>

      <JoinedRooms>
        {data?.map(room => {
          return <RoomCard key={room.uuid} room={room} />;
        })}
      </JoinedRooms>
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

const Category = styled.button`
  font-size: 14px;
  font-weight: 400;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  margin-top: 72px;
  height: 100%;
  width: 100%;
`;

const ListTitle = styled.div`
  margin-bottom: 16px;
  font-size: 24px;
`;

const JoinedRooms = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  width: 1215px;
  min-height: 470px;

  overflow: scroll;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default RoomList;
