import { atom } from 'recoil';

export const userAtom = atom({
  key: 'userAtom', // 아톰의 이름. 전역적으로 unique 해야 함
  default: { email: '', password: '', nickname: '' }
})