"use client"

import { useRef } from "react";

type DebouncedButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

function DebouncedButton({ onClick, children }: DebouncedButtonProps) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <button
      onClick={() => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          onClick();
        }, 1000);
      }}
    >
      {children}
    </button>
  );
}

export default function Dashboard() {
  return (
    <>
      <DebouncedButton onClick={() => alert("Spaceship launched!")}>
        Launch the spaceship
      </DebouncedButton>

      <DebouncedButton onClick={() => alert("Soup boiled!")}>
        Boil the soup
      </DebouncedButton>

      <DebouncedButton onClick={() => alert("Lullaby sung!")}>
        Sing a lullaby
      </DebouncedButton>
    </>
  );
}