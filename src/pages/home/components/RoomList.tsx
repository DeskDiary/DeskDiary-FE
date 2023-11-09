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
import { Pagination } from '@mui/material';

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
  const [count, setCount] = useState(1);

  const changePopular = (value: boolean) => {
    setIsPopular(value);
    if (value) {
      setSort('Popular');
    } else {
      setSort('Latest');
    }
  };

  let fetchName = show + sort;
  // console.log(show)
  const handlePageChange = (pageNumber: number) => {
    setNum(pageNumber);

    const fetchData = async () => {
      const fetchFunc =
        fetchFunctions[fetchName as keyof typeof fetchFunctions];
      const result = await fetchFunc(pageNumber);
      if (result.totalCount % 10 === 0) {
        setCount(result.totalCount / 10);
      } else {
        setCount(Math.floor(result.totalCount / 10) + 1);
      }
      if (
        fetchName === 'fetchRoomPopular' ||
        fetchName === 'fetchRoomLatest' ||
        fetchName === 'fetchRoomTopPopular' ||
        fetchName === 'fetchRoomTopLatest'
      ) {
        setRoomList(result);
        return result;
      } else if ('QueryResults' in result) {
        setRoomList(result.QueryResults);
        return result;
      } else {
        throw new Error('Invalid fetchName');
      }
    };

    fetchData();
  };

  useEffect(() => {
    handlePageChange(1);
  }, []);

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
      {
        fetchName !== 'fetchRoomPopular' &&
        fetchName !== 'fetchRoomLatest' &&
        fetchName !== 'fetchRoomTopPopular' &&
        fetchName !== 'fetchRoomTopLatest' && <Pagination
        count={count}
        showFirstButton
        showLastButton
        page={num} // 현재 페이지를 num 상태 변수와 동기화
        onChange={(event, page) => handlePageChange(page)} // 페이지 번호 변경 이벤트 핸들러
      />
      }

      
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
