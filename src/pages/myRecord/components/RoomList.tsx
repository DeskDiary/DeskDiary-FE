import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchJoinRoom, fetchCreatedRoom } from '../../../axios/api';
import RoomCard from '../../home/components/RoomCard';
import { getCookie } from '../../../auth/cookie';

type RoomListProps = {
  label: string;
  mydesk: string;
};

const fetchFunctions = {
  fetchJoinRoom: fetchJoinRoom,
  fetchCreatedRoom: fetchCreatedRoom,
};

const RoomList: React.FC<RoomListProps> = ({ label, mydesk }) => {
  const token = getCookie('token');

  let fetchName = mydesk;

  const { data, refetch } = useQuery<room[], Error>(
    fetchName, // 쿼리 키를 배열로 만들어 fetchName, show, sort 추가
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
      refetchOnWindowFocus: false,
    }
  );

  return (
    <List>
      <ListTitle>{label}</ListTitle>

      {Array.isArray(data) && (
        <JoinedRooms>
          {data.map(room => {
            return <RoomCard key={room.uuid} room={room} fetch={fetchName}/>;
          })}
        </JoinedRooms>
      )}
    </List>
  );
};

const ListTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
  font-size: 24px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  margin-top: 40px;
  height: 100%;
  width: 100%;
`;

const JoinedRooms = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  width: 1215px;
  /* min-height: 470px; */

  overflow: scroll;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default RoomList;
