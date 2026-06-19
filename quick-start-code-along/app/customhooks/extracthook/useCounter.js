"use client"

export default function Counter() {
  const count = useCounter();
  return <h1>Seconds passed: {count}</h1>;
}