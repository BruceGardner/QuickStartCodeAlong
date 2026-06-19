"use client"

import { useState, useEffect, useRef } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);

  const incrementRef = useRef(increment);

  useEffect(() => {
    incrementRef.current = increment;
  }, [increment]);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + incrementRef.current);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <>
      <h1>
        Counter: {count}
        <button onClick={() => setCount(0)}>Reset</button>
      </h1>

      <hr />

      <p>
        Every second, increment by:
        <button
          disabled={increment === 0}
          onClick={() => setIncrement(i => i - 1)}
        >
          –
        </button>

        <b>{increment}</b>

        <button onClick={() => setIncrement(i => i + 1)}>
          +
        </button>
      </p>
    </>
  );
}