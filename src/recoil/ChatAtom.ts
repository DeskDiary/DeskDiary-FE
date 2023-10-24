import { atom } from 'recoil';
import { atomFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';

type MessageData = {
  message: string;
  user: string;
  profileImage: string;
  time: string;
  roomId: string;
};

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: localStorage,
});

export const ChatMessagesAtom = atomFamily ({
  key: 'chatMessagesAtom',
  default: [] as MessageData[],
  effects_UNSTABLE: [persistAtom],
});
