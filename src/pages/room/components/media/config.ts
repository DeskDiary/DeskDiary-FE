import {
  createClient,
  ClientConfig,
  createMicrophoneAndCameraTracks,
  createMicrophoneAudioTrack,
  createScreenVideoTrack,
  ILocalAudioTrack,
  ILocalVideoTrack,
  AgoraRTCError,
} from 'agora-rtc-react';
import AgoraRTC from 'agora-rtc-sdk-ng';

/**
 * 0: 디버그. 모든 API 로그를 출력합니다. 
 * 1: 정보. INFO, WARNING, ERROR 수준의 로그를 출력합니다. 
 * 2: 경고. WARNING 및 ERROR 수준의 로그를 출력합니다. 
 * 3: 오류. ERROR 수준의 로그를 출력합니다. 
 * 4: 없음. 로그를 출력하지 않습니다.
 */
AgoraRTC.setLogLevel(3);

const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

export const useClient = createClient(config);