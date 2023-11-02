import axios from 'axios';
import { getCookie } from '../auth/cookie';

const token = getCookie('token');
const serverUrl = process.env.REACT_APP_SERVER_URL;
const headers = {
  headers: {
    Authorization: `Bearer ${token}`, // 여기서 토큰을 헤더에 추가해줘
  },
};

const 초를시분으로 = (time: number) => {
  const hour = Math.floor(time / 3600);
  const minute = Math.floor((time % 3600) / 60);
  return [hour, minute];
};

// 1일 학습 기록 조회
export const todayLerningHistoryHome = async () => {
  try {
    const response = await axios.get(
      `${serverUrl}/learning-history/today`,
      headers,
    );
    // console.log('api 1일 학습 기록 조회', response.data);
    const data = response.data;
    if (data.message === '등록된 목표시간이 없습니다.') {
      return [0, 0, 0, 0, 0, 0];
    } else {
      const goalTime = Number(data.goaltime);
      const hobbyTotalHours = Number(data.hobbyTotalHours);
      const studyTotalHours = Number(data.studyTotalHours);
      const [goalTimeHour, goalTimeMinute] = 초를시분으로(goalTime);
      const totalSecond = hobbyTotalHours + studyTotalHours;
      const [totalHours, totalMinute] = 초를시분으로(totalSecond);
      return [
        goalTimeHour,
        goalTimeMinute,
        totalHours,
        totalMinute,
        goalTime,
        totalSecond,
      ];
    }
  } catch (error) {
    // console.error(error);
    return [0, 0, 0, 0, 0, 0];
  }
};
