import AgoraRTC from 'agora-rtc-sdk-ng';
import { atom } from 'recoil';

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

/*
  카메라 목록 
  [
    {
        "deviceId": "7dbe8291862a62b8810f223774f25779343b218eb8f5010f7299d349c05049a6",
        "kind": "videoinput",
        "label": "ABKO APC930 QHD WEBCAM (1bcf:5034)",
        "groupId": "c6bac8fdd3b8a4293be76d84bd784b1dbfd7f3bb6a2d4c5479fbb5e3db9e0adf"
    },
    ...
]
*/

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
