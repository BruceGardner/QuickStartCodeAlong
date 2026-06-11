"use client";

import { useState } from "react";

type CounterButtonProps = {
  label: string;
  count: number;
  onClick: () => void;
};

function CounterButton({
  label,
  count,
  onClick,
}: CounterButtonProps) {
  return (
    <div>
      <button onClick={onClick}>
        {label}: {count}
      </button>

      <p>
        {count < 5
          ? "You haven't clicked me enough times."
          : "You've clicked me too many times. Settle down."}
      </p>
    </div>
  );
}

export default function Home() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <main>
      <h1>Button Counter App</h1>

      <CounterButton
        label="Button 1"
        count={count1}
        onClick={() => setCount1(count1 + 1)}
      />

      <CounterButton
        label="Button 2"
        count={count2}
        onClick={() => setCount2(count2 + 1)}
      />
    </main>
  );
}