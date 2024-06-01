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
  const [rotation, setRotation ] = useState(0)
  const [speed, setSpeed] = useState(4000);

  useEffect(() => {

    let timeout: any;
    function movePizza() {
      if (clickTargetRef.current) {
        const width = clickTargetRef.current.clientWidth;
        const height = clickTargetRef.current.clientHeight;
        setX(Math.max(0, Math.random() * window.innerWidth - width));
        setY(Math.max(0, Math.random() * window.innerHeight - height));
        setRotation(Math.random() * 360);
      }

      timeout = setTimeout(movePizza, speed);
    }

    movePizza();

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [clickTargetRef]);

  function clicked(event: React.MouseEvent<HTMLDivElement>) {
    setScore((score) => score + 1);
    // setSpeed((speed) => speed * 0.95);
  }

  const style = {
    transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
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
