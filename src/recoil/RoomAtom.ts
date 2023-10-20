import { atom } from 'recoil';

export const RoomAtom = atom({
  key: 'RoomAtom',
  default: { title: '', maxHeadcount: 1, category: '', note: '', file:'' },
});

export const SelectCateoryAtom = atom({
  key: 'SelectCateoryAtom',
  default: { category: ''}
})
