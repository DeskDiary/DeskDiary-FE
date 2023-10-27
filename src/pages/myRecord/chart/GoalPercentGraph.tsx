import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import { useRecoilState } from 'recoil';
import { getCookie } from '../../../auth/cookie';
import 아무사진 from '../../../images/logo.svg';
import { GoalTimeModalState } from '../../../recoil/DeskAtom';

type GoalPercentGraphProps = {};
const GoalPercentGraph: React.FC<GoalPercentGraphProps> = () => {
  const [GoalModal, setGoalModal] = useRecoilState<boolean>(GoalTimeModalState);
  const [목표시간, set목표시간] = useState<string>('??시간 ??분');
  const [취미누적시간, set취미누적시간] = useState<string>('??시간 ??분');

  const goalModalOnclickHandler = () => {
    setGoalModal(!GoalModal);
  };
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const token = getCookie('token');
  const 목표시간조회 = async () => {
    try {
      const response = await axios.get(`${serverUrl}/me/history/goaltime`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const time = response.data.goalTime;
      const hour = Math.floor(time / 3600);
      const minute = ((time % 3600) / 60).toString().padStart(2, '0');
      set목표시간(`${hour}시간 ${minute}분`);
    } catch (error) {
      console.error(error);
    }
  };
  const 누적시간조회 = async () => {
    try {
      const response = await axios.get(`${serverUrl}/learning-history/today`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      console.log('취미누적시간', data)
      set취미누적시간(data.hobbyTotalHours+'');
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    목표시간조회();
    누적시간조회();
  }, []);

  return (
    <Body>
      <Title>오늘의 취미 목표</Title>
      <PercentImg>
        <img src={아무사진} />
        <p>40%</p>
      </PercentImg>
      <DetailTimeInfo>
        <DetailTimeInfoPBox>
          <p>목표시간</p>
          <p>{목표시간}</p>
        </DetailTimeInfoPBox>
        <DetailTimeInfoPBox>
          <p>누적시간</p>
          <p>{취미누적시간}</p>
        </DetailTimeInfoPBox>
      </DetailTimeInfo>

      <PageMoveButton onClick={goalModalOnclickHandler}>
        목표시간 수정하기
      </PageMoveButton>
    </Body>
  );
};

const Body = styled.div`
  width: 378px;
  height: 478px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 2px 4px 9px 0px rgba(0, 0, 0, 0.25);
  padding: 20px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 35px;
`;

const PercentImg = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    width: 234px;
    height: 234px;
    background-image: linear-gradient(to top, yellow 50%, grey 50%);
  }
  p {
    font-size: 30px;
    font-weight: 700;
    margin-top: 200px;
  }
`;

const DetailTimeInfo = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DetailTimeInfoPBox = styled.div`
  display: flex;
  justify-content: space-between;
  p:first-child {
    font-size: 16px;
    font-weight: 700;
  }
  p:last-child {
    font-size: 22px;
    font-weight: 700;
    color: var(--primary-00);
  }
`;

const PageMoveButton = styled.button`
  margin-left: 200px;
  margin-top: 36px;
  border: none;
  font-size: 16px;
  align-self: flex-end;
`;
export default GoalPercentGraph;
