import AgoraRTC from 'agora-rtc-sdk-ng';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  cameraListState,
  choiceCameraState,
  choiceMicState,
  micListState,
} from '../recoil/CamAtom';

type MediaSetupProps = {};

const MediaSetup: React.FC<MediaSetupProps> = () => {
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

  const navigate = useNavigate();

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
    console.log('테스트 종료 버튼 눌림');
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
    setChoiceCamera(cameras[0]?.deviceId);
  }, []);

  useEffect(() => {
    startCameraTest();
  }, [choiceCamera]);

  useEffect(() => {
    startMicTest();
  }, [choiceMic]);
  return (
    <Container col gap="22px">
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

      <CamSetting align="start" gap="10px">
        <ButonGroup col align="start" gap="5px">
          <TestButton onClick={startCameraTest} disabled={isCameraTesting}>
            Camera
          </TestButton>
          <MediaSelect
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
          </MediaSelect>
        </ButonGroup>
        <ButonGroup col align="start" gap="5px">
          <TestButton onClick={startMicTest} disabled={isMicTesting}>
            Microphone
          </TestButton>
          <MediaSelect
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
          </MediaSelect>
        </ButonGroup>
      </CamSetting>
      <button onClick={stopTest} disabled={!localStream}>
        테스트 중지
      </button>
    </Container>
  );
};

const FlexContainer = styled.div<{
  col?: boolean;
  align?: string;
  justify?: string;
  gap?: string;
}>`
  display: flex;
  flex-direction: ${props => (props.col ? 'column' : 'row')};
  align-items: ${props => (props.align ? props.align : 'center')};
  justify-content: ${props => (props.justify ? props.justify : 'center')};
  gap: ${props => props.gap || '0'};
`;

const MediaSelect = styled.select`
  width: 100%;
  height: 30px;
  color: #6e6e6e;
  &:focus{
    outline: none;
  }
`;

const ButonGroup = styled(FlexContainer)`
  width: 100%;
`;

const TestButton = styled.button`
  background-color: #dbdbdb;
  padding: 5px 10px;
  border-radius: 5px;
  color: #6e6e6e;
  font-size: 15px;
  border: none;
  cursor: pointer;
`;

const Cam = styled.video`
  width: 234px;
  height: 140px;
  border-radius: 10px;
  background-color: #6e6e6e;
`;

const CamSetting = styled(FlexContainer)`
  width: 100%;
`;

const Container = styled(FlexContainer)`
  width: 582px;
`;
export default MediaSetup;
