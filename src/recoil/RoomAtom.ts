import { atom } from 'recoil';

export const RoomAtom = atom({
  key: 'RoomAtom',
  default: {
    agoraAppId: '',
    agoraToken: '',
    category: '',
    count: 0,
    createdAt: '',
    maxHeadcount: 0,
    note: '',
    nowHeadcount: 0,
    ownerId: 0,
    roomId: 0,
    roomThumbnail: '',
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


export const RoomInfo = atom({
  key: 'RoomInfo',
  default: {
    agoraAppId: '',
    agoraToken: '',
    category: '',
    count: 0,
    createdAt: '',
    maxHeadcount: 0,
    note: '',
    nowHeadcount: 0,
    ownerId: 0,
    roomId: 0,
    roomThumbnail: '',
    title: '',
    updatedAt: '',
    uuid: '',
  },
});
