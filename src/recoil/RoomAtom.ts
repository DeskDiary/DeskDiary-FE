import { atom } from 'recoil';

export const RoomAtom = atom({
  key: 'RoomAtom',
  default: { title: '', maxHeadCount: 1, category: '', precautions: '', image:'' },
});
