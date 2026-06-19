import { useEffect } from 'react';
import { useEffectEvent } from 'react';

export default function ChatRoom({ roomId, createConnection, onMessage }) {
  const onMessageEvent = useEffectEvent(onMessage);
  useEffect(() => {
    const connection = createConnection();
    connection.on('message', (msg) => onMessageEvent(msg));
    connection.connect();
    return () => connection.disconnect();
  }, [createConnection, roomId]); 

  return <h1>Welcome to the {roomId} room!</h1>;
}