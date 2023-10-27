// socketInstance.ts
import io from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_SERVER_URL!}`, {
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 3000,
});
export default socket;
