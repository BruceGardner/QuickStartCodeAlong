"use client"

import { useState, useCallback } from 'react';
import ChatRoom from './ChatRoom';
import {
  createEncryptedConnection,
  createUnencryptedConnection,
} from './chat';
import { showNotification } from './notifications';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [roomId, setRoomId] = useState('general');
  const [isEncrypted, setIsEncrypted] = useState(false);

  const createConnection = useCallback(() => {
    const options = {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };

    return isEncrypted
      ? createEncryptedConnection(options)
      : createUnencryptedConnection(options);
  }, [roomId, isEncrypted]);

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>

      <label>
        <input
          type="checkbox"
          checked={isEncrypted}
          onChange={e => setIsEncrypted(e.target.checked)}
        />
        Enable encryption
      </label>

      <label>
        Choose the chat room:{' '}
        <select value={roomId} onChange={e => setRoomId(e.target.value)}>
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>

      <hr />

      <ChatRoom
        roomId={roomId}
        createConnection={createConnection}
        onMessage={(msg: string) => {
          showNotification(
            'New message: ' + msg,
            isDark ? 'dark' : 'light'
          );
        }}
      />
    </>
  );
}