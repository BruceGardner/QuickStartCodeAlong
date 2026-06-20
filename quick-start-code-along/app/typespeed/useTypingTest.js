import { useEffect, useState } from "react";

export function useTypingTest(prompt, typedText) {
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (typedText.length === 1 && startTime === null) {
      setStartTime(Date.now());
    }

    if (typedText === prompt && startTime) {
      const endTime = Date.now();
      const timeInMinutes = (endTime - startTime) / 1000 / 60;

      const words = prompt.trim().split(" ").length;
      const calculatedWpm = Math.round(words / timeInMinutes);

      setWpm(calculatedWpm);
      setCompleted(true);
    }

    if (typedText.length === 0) {
      setStartTime(null);
      setWpm(null);
      setCompleted(false);
    }
  }, [typedText, prompt, startTime]);

  return { wpm, completed };
}