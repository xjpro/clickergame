"use client";

import { useEffect, useRef, useState } from "react";

let timeout: any;

export default function Home() {
  const clickTargetRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [x, setX] = useState(
    typeof window !== "undefined" ? window.innerWidth / 2 : 100,
  );
  const [y, setY] = useState(
    typeof window !== "undefined" ? window.innerHeight / 2 : 100,
  );
  const [rotation, setRotation] = useState(0);
  const [speed, setSpeed] = useState(2000);
  const [transition, setTransition] = useState(speed);

  function movePizza() {
    if (timeout) {
      clearTimeout(timeout);
    }

    if (clickTargetRef.current) {
      const width = clickTargetRef.current.clientWidth;
      const height = clickTargetRef.current.clientHeight;
      setX(Math.max(10, Math.random() * window.innerWidth - width - 10));
      setY(Math.max(10, Math.random() * window.innerHeight - height - 10));
      setRotation(Math.random() * 360);
    }

    timeout = setTimeout(automovePizza, speed);
  }

  function automovePizza() {
    setTransition(speed);
    movePizza();
  }

  function clicked(event: React.MouseEvent<HTMLDivElement>) {
    setScore((score) => score + 1);
    setSpeed((speed) => speed * 0.985);
    setTransition(250);
    movePizza();
  }

  const style = {
    transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
    transition: `transform ${transition}ms`,
  };

  return (
    <div className="level">
      <div className="heading">
        <h1>CLICK THE PIZZA</h1>
        <div className="score">Score: {score}</div>
        {/*<div>{speed}</div>*/}
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
