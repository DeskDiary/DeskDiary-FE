import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import { useRecoilState } from 'recoil';
import { getCookie } from '../../../auth/cookie';
import logo from '../../../images/logo.svg';
import { GoalTime, GoalTimeModalState } from '../../../recoil/DeskAtom';
import graph from '../../../images/desk/graph.png';

type GoalPercentGraphProps = {};
const GoalPercentGraph: React.FC<GoalPercentGraphProps> = () => {
  const [GoalModal, setGoalModal] = useRecoilState<boolean>(GoalTimeModalState);
  const [목표시간, set목표시간] = useState<string>('??시간 ??분');
  const [목표시간sec, set목표시간sec] = useState<number>(0);
  const [취미누적시간, set취미누적시간] = useState<string>('??시간 ??분');
  const [스터디누적시간, set스터디누적시간] = useState<string>('??시간 ??분');
  const [percent, setPercent] = useState(0);
  const [goalTime, setGoalTime] = useRecoilState(GoalTime); // 목표시간
  useEffect(() => {
    const time = +취미누적시간 + +스터디누적시간;
    setPercent(Math.floor((time / 목표시간sec) * 100));
  }, [목표시간, 취미누적시간, 스터디누적시간]);

  const 누적시간forMatter = (취미누적시간: string, 스터디누적시간: string) => {
    const time = +취미누적시간 + +스터디누적시간;
    if (time >= 0) {
      const hour = Math.floor(time / 3600)
        .toString()
        .padStart(2, '0');
      const minute = Math.floor((time % 3600) / 60)
        .toString()
        .padStart(2, '0');
      return `${hour}시간 ${minute}분`;
    } else {
      return `00시간 00분`;
    }
  };

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
      setGoalTime(response.data);
      const time = response.data.goalTime;
      set목표시간sec(time);
      const hour = Math.floor(time / 3600).toString().padStart(2, '0');
      const minute = ((time % 3600) / 60).toString().padStart(2, '0');
      // console.log('time', time);
      if (time >= 0) {
        set목표시간(`${hour}시간 ${minute}분`);
      } else {
        set목표시간(`00시간 00분`);
      }
    } catch (error) {
      // console.error(error);
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
      set취미누적시간(data.hobbyTotalHours + '');
      set스터디누적시간(data.studyTotalHours + '');
    } catch (error) {
      // console.error(error);
    }
  };
  useEffect(() => {
    목표시간조회();
    누적시간조회();
  }, [GoalModal]);

  return (
    <Body>
      {목표시간sec > 0 ? (
        <Text>
          <p>목표한 공부 시간 중</p>
          <p>
            <span>{percent}%</span> 를
          </p>
          <p>해냈어요</p>
        </Text>
      ) : (
        <Text>
          <p>
            <br />
          </p>
          <p>목표를 설정해주세요</p>
          <p>
            <br />
          </p>
        </Text>
      )}

      <Image src={graph} alt="그래프" percent={percent} />

      <DetailTimeInfo>
        <DetailTimeInfoPBox>
          <p>목표시간</p>
          <p>{목표시간}</p>
        </DetailTimeInfoPBox>
        <DetailTimeInfoPBox>
          <p>누적시간</p>
          <p>{누적시간forMatter(취미누적시간, 스터디누적시간)}</p>
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
  background-color: #1a81e8;
  box-shadow: 2px 4px 9px 0px rgba(0, 0, 0, 0.25);
  padding: 20px;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 27px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 18px;
    line-height: 123.5%;
    letter-spacing: 0.25px;
    font-weight: 400;
    color: white;
  }
  p > span {
    color: white;
    font-size: 40px;
    font-weight: 700;
    line-height: 123.5%;
    letter-spacing: 0.25px;
  }
`;

const Image = styled.img<{ percent: number }>`
  margin-top: 24px;
  display: flex;
  width: 200px;
  height: 196px;
  margin-left: auto;
  margin-right: auto;
  background-image: linear-gradient(
    to bottom,
    white,
    white ${props => 100 - props.percent}%,
    #ffbb00,
    #ffbb00 ${props => 100 - props.percent}%
  );
`;

const DetailTimeInfo = styled.div`
  margin-top: 24px;
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
    color: white;
  }
  p:last-child {
    font-size: 22px;
    font-weight: 700;
    color: white;
  }
`;

const PageMoveButton = styled.button`
  margin-left: 221px;
  margin-top: 18px;
  border: none;
  font-size: 16px;
  align-self: flex-end;
  color: white;
`;
export default GoalPercentGraph;
