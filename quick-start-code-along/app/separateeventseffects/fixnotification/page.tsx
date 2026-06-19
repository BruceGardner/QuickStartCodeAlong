"use client"

import { useState, useEffect } from 'react';
import { useEffectEvent } from 'react';
import { createConnection } from './chat';
import { showNotification } from './notifications';

const serverUrl = 'https://localhost:1234';

function ChatRoom({roomId, theme,}: {roomId: string; theme: 'light' | 'dark';}) {
  const onConnected = useEffectEvent(() => {
    showNotification('Welcome to ' + roomId, theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);

    const handleConnected = () => {
        const thisRoom = roomId;

        setTimeout(() => {
        showNotification('Welcome to ' + thisRoom, theme);
        }, 2000);
    };

    connection.on('connected', handleConnected);
    connection.connect();

    return () => {
        connection.disconnect();
    };
    }, [roomId, theme]);

  return <h1>Welcome to the {roomId} room!</h1>
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
