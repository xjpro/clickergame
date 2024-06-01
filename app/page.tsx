"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const clickTargetRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [x, setX] = useState(
    typeof window !== "undefined" ? window.innerWidth / 2 : 100,
  );
  const [y, setY] = useState(
    typeof window !== "undefined" ? window.innerHeight / 2 : 100,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (!clickTargetRef.current) return;
      const width = clickTargetRef.current.clientWidth;

      const height = clickTargetRef.current.clientHeight;
      setX(Math.max(0, Math.random() * window.innerWidth - width));
      setY(Math.max(0, Math.random() * window.innerHeight - height));
    }, 2000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  function clicked(event: React.MouseEvent<HTMLDivElement>) {
    setScore((score) => score + 1);
  }

  const style = {
    transform: `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`,
  };

  return (
    <div className="level">
      <div className="heading">
        <h1>CLICK THE PIZZA</h1>
        <div className="score">Score: {score}</div>
      </div>

      <div
        ref={clickTargetRef}
        className="click-target"
        style={style}
        onClick={clicked}
      >
        🍕
      </div>
    </div>
  );
}
