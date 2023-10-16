import { atom } from 'recoil';

export const RoomAtom = atom({
  key: 'RoomAtom',
  default: [] as { title: string, maxHeadCount: number, category: string, precautions: string }[],
});
