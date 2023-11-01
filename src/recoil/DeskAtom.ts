import { atom } from 'recoil';

export const GoalTimeModalState = atom({
  key: 'GoalTimeModalState',
  default: false,
});

export const GoalTime = atom({
  key: 'GoalTime',
  default: {
    goalTime: 0
  },
});
