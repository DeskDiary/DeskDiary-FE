import AgoraRTC from 'agora-rtc-sdk-ng';
import React, { useState } from 'react';

type CameraProps = {
  
};

const APP_ID = "a53d5f93a9934e0299413f35614fa485";
const TOKEN =
  "007eJxTYPgdbvD9+D1R4TmXHnB/cJdZ5m7yj3n5leyni+eVHTN4tv2rAkOiqXGKaZqlcaKlpbFJqoGRpaWJoXGasamZoUlaoomFqcFmldSGQEYGiQdvmBgZIBDEZ2Eoys/PZWAAAOpbISo=";
const CHANNEL = "room";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

const Camera: React.FC<CameraProps> = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [localTracks, setLocalTracks] = useState<any[]>([]);

  const handleUserJoined = async (user: any, mediaType: any) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setUsers((previousUsers: any[]) => [...previousUsers, user]);
    }
  };
  
  return <div>Have a good coding</div>
}
export default Camera;
