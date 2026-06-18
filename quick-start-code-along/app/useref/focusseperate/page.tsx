"use client"


import { useRef } from "react";
import SearchButton from "./SearchButton.js";
import SearchInput from "./SearchInput.js";

export default function Page() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <nav>
        <SearchButton onClick={focusInput} />
      </nav>
      <SearchInput inputRef={inputRef} />
    </>
  );
}