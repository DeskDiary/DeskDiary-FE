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

export const RoomUUIDAtom = atom({
  key: 'RoomUUIDAtom',
  default: '',
});

// 방 나가기 버튼 클릭시 나오는 모달
export const RoomModalAtom = atom({
  key: 'RoomModalAtom',
  default: false,
});
