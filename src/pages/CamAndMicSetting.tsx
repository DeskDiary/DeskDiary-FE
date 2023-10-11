import AgoraRTC from 'agora-rtc-sdk-ng';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  cameraListState,
  choiceCameraState,
  choiceMicState,
  micListState,
} from '../recoil/CamAtom';

type CamAndMicSettingProps = {};

const CamAndMicSetting: React.FC<CamAndMicSettingProps> = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isCameraTesting, setCameraTesting] = useState(false);
  const [isMicTesting, setMicTesting] = useState(false);

  const [cameras, setCameras] =
    useRecoilState<MediaDeviceInfo[]>(cameraListState);
  const [mics, setMics] = useRecoilState<MediaDeviceInfo[]>(micListState);

  const [choiceCamera, setChoiceCamera] = useRecoilState(choiceCameraState);
  const [choiceMic, setChoiceMic] = useRecoilState(choiceMicState);

  const choiceCameraHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChoiceCamera(e.target.value);
  };

  const choiceMicHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChoiceMic(e.target.value);
  };

  const startCameraTest = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: choiceCamera } },
      });
      console.log('카메라 시작 스트림', stream);
      setLocalStream(stream);
      setCameraTesting(true);
    } catch (error) {
      console.error('Camera test failed:', error);
    }
  };

  const startMicTest = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: choiceMic } },
      });
      console.log('마이크 시작 스트림', stream);
      setLocalStream(stream);
      setMicTesting(true);
    } catch (error) {
      console.error('Microphone test failed:', error);
    }
  };

  const stopTest = () => {
    console.log('테스트 종료 버튼 눌림')
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
      setCameraTesting(false);
      setMicTesting(false);
    }
  };

  const getCamerasAndMics = async () => {
    try {
      const cameraList = await AgoraRTC.getCameras();
      console.log('카메라 목록', cameraList);
      setCameras(cameraList);
    } catch (error) {
      console.error('카메라 목록을 가져오는 중 오류 발생:', error);
    }

    try {
      const micList = await AgoraRTC.getMicrophones();
      console.log('마이크 목록:', micList);
      setMics(micList);
    } catch (error) {
      console.error('마이크 목록을 가져오지 못했습니다.', error);
    }
  };

  useEffect(() => {
    getCamerasAndMics();
  }, []);

  useEffect(() => {
    startCameraTest();
  }, [choiceCamera]);

  useEffect(() => {
    startMicTest();
  }, [choiceMic]);

  return (
    <Body>
      <p>Welcome to 이것은 방이다.</p>
      <AllSettingsArea>
        <CamArea>
          {localStream ? (
            <Cam
              autoPlay
              muted
              playsInline
              ref={video => {
                if (video) {
                  video.srcObject = localStream;
                }
              }}
            ></Cam>
          ) : (
            <Cam />
          )}

          <CamSetting>
            <div>
              <button onClick={startCameraTest} disabled={isCameraTesting}>
                카메라 테스트 시작
              </button>
              <select
                name="cameraSelect"
                id=""
                value={choiceCamera}
                onChange={choiceCameraHandler}
              >
                {cameras.map(item => {
                  return (
                    <option key={item.deviceId} value={item.deviceId}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <button onClick={startMicTest} disabled={isMicTesting}>
                마이크 테스트 시작
              </button>
              <select
                name="micSelect"
                id=""
                value={choiceMic}
                onChange={choiceMicHandler}
              >
                {mics.map(item => {
                  return (
                    <option key={item.deviceId} value={item.deviceId}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </div>

            <button onClick={stopTest} disabled={!localStream}>
              테스트 중지
            </button>
          </CamSetting>
        </CamArea>
        <UserInfoArea>
          <div>
            <UserInfoImg
              src="https://stimg.afreecatv.com/LOGO/ls/lshooooo/lshooooo.jpg"
              alt=""
            />
            <input type="text" value="역시이상호" readOnly />
          </div>

          <button>방 입장하기</button>
        </UserInfoArea>
      </AllSettingsArea>

      <div>
        <h2>카메라 및 마이크 테스트</h2>
        {isMicTesting && <p>마이크 테스트 중...</p>}
      </div>
    </Body>
  );
};

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const AllSettingsArea = styled.div`
  display: flex;
  height: 500px;
  margin: 50px;
  gap: 20px;
`;

const CamArea = styled.div`
  background-color: beige;
  width: 400px;
  height: 400px;
`;

const Cam = styled.video`
  background-color: gray;
  height: 300px;
  width: 400px;
`;
const CamSetting = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const UserInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  background-color: bisque;
`;

const UserInfoImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const UserInfoRow = styled.div``;

const JoinButton = styled.div`
  background-color: beige;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export default CamAndMicSetting;
