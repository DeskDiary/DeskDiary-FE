import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import sample from '../../../images/ranking/3rd.svg';
import { MonthTime } from '../../../recoil/DeskAtom';
import { useQuery } from 'react-query';
import { fetchUser } from '../../../axios/api';
import help from '../../../images/room/help_outline.svg';

type LevelProps = {};

const Level: React.FC<LevelProps> = () => {
  const [monthTime, setMonthTime] = useRecoilState(MonthTime);
  const [level, setLevel] = useState<number>(0);
  const { data } = useQuery<user>('lever-user', fetchUser, {
    refetchOnWindowFocus: false,
  });
  // console.log('데이타', data);
  useEffect(() => {
    if (monthTime === 0) {
      setLevel(0);
    } else if (monthTime > 0) {
      setLevel(1);
    } else if (monthTime >= 86400) {
      setLevel(2);
    } else if (monthTime >= 604800) {
      setLevel(3);
    } else if (monthTime >= 128600) {
      setLevel(4);
    }
  }, [monthTime]);
  return (
    <Container>
      <TextBox>
        <p>{data?.nickname ? data.nickname : '???'} 님은</p>
        <p>{`Level ${level} 무거운엉덩이`}</p>
        <Help>
          <img src={help} alt="help" />
          <p>
            1달기준 누적시간 1초이상 Lv1, 누적시간 86400초이상 Lv2, 누적시간 604800 Lv3, 누적시간 128600 Lv4
          </p>
        </Help>
      </TextBox>
      <img src={sample} alt="Level" />
    </Container>
  );
};

const Container = styled.div`
  box-shadow: 2px 4px 9px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 0px 30px;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  img {
    width: 120px;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  line-height: 123.5%; /* 49.4px */
  letter-spacing: 0.25px;
  font-size: 40px;
  font-weight: 700;
`;

const Help = styled.div`
  position: absolute;
  margin-top: 100px;
  z-index: 100;
  margin-left: -12px;
  display: flex;
  gap: 10px;
  p {
    font-size: 12px;
    line-height: 100%;
    color: black;
    display: none;
    font-weight: normal;
    margin-top: 7px;
  }
  &:hover {
    p {
      display: flex;
    }
  }
  img {
    width: 24px;
    margin-left: -12px;
  }
`;

export default Level;
