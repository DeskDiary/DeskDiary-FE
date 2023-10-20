import { atom } from 'recoil';

export const RoomAtom = atom({
  key: 'RoomAtom',
  default: {
    agoraAppId: '',
    agoraToken: '',
    category: '',
    count: 1,
    createdAt: '',
    maxHeadcount: 1,
    note: '',
    nowHeadcount: 1,
    ownerId: 1,
    roomId: 1,
    file: '',
    title: '',
    updatedAt: '',
    uuid: '',
  },
});

export const SelectCateoryAtom = atom({
  key: 'SelectCateoryAtom',
  default: { category: '' },
});

export const createRoomModalAtom = atom({
  key: 'CreateRoomModalAtom',
  default: { isOpen:false },
})
