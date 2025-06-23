import { useState, useEffect } from "react";

export default function useTypewriter(phrases: string[], typingSpeed: number, pauseTime: number) {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const handleTyping = setInterval(() => {
      const currentPhrase = phrases[loopIndex % phrases.length];
      
      if (!isDeleting) {
        setCurrentText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setCurrentText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setLoopIndex((prev) => prev + 1);
        }
      }
    }, typingSpeed);

    return () => clearInterval(handleTyping);
  }, [charIndex, isDeleting, loopIndex, phrases, typingSpeed, pauseTime]);

  return currentText;
}
