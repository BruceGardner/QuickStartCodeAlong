"use client"

import { useRef, useEffect, useState } from "react";
import { useTypingTest } from "./useTypingTest";

export default function Page() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const prompt = "The quick brown fox jumps over the lazy dog";
  const [text, setText] = useState("");
  const { wpm, completed } = useTypingTest(prompt, text);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Typing Speed Test</h1>

      <p style={{ marginTop: 20 }}>
        Prompt: {prompt}
      </p>

      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        cols={60}
        style={{ marginTop: 20, display: "block" }}
      />

      {completed && (
        <p style={{ marginTop: 20 }}>
          You finished! WPM: {wpm}
        </p>
      )}
    </main>
  );
}