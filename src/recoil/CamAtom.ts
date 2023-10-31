import { atom } from 'recoil';
import AgoraRTC, {
  IMicrophoneAudioTrack,
  ICameraVideoTrack
} from 'agora-rtc-react';

const APP_ID = 'a53d5f93a9934e0299413f35614fa485';
const TOKEN =
  '007eJxTYPgdbvD9+D1R4TmXHnB/cJdZ5m7yj3n5leyni+eVHTN4tv2rAkOiqXGKaZqlcaKlpbFJqoGRpaWJoXGasamZoUlaoomFqcFmldSGQEYGiQdvmBgZIBDEZ2Eoys/PZWAAAOpbISo=';
const CHANNEL = 'room';

const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

export const cameraListState = atom<MediaDeviceInfo[]>({
  key: 'cameraListState',
  default: [],
});

export const micListState = atom<MediaDeviceInfo[]>({
  key: 'micListState',
  default: [],
});

/*
  {
    "deviceId": "default",
    "kind": "audioinput",
    "label": "기본값 - 마이크(NVIDIA Broadcast)",
    "groupId": "3363d66d1b8cdb641560cb5825a9d47d12fa79bb9863e474abf11b798c03db5a"
  },
...
*/

export const choiceCameraState = atom<string>({
  key: 'choiceCameraState',
  default: '',
});

export const choiceMicState = atom<string>({
  key: 'choiceMicState',
  default: '',
});

