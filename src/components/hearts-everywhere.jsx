"use client"

import { useState, useEffect } from 'react'

const Heart = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className="text-pink-500">
    <path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

export function HeartsEverywhere() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHearts((prevHearts) => [
        ...prevHearts,
        {
          id: Date.now(),
          style: {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            width: `${Math.random() * 30 + 10}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
          },
        },
      ])
    }, 300)

    return () => clearInterval(intervalId);
  }, [])

  useEffect(() => {
    if (hearts.length > 50) {
      setHearts((prevHearts) => prevHearts.slice(1))
    }
  }, [hearts])

  return (<>
    <style jsx global>{`
      @keyframes pulse {
        0%, 100% {
          transform: scale(1) rotate(0deg);
          opacity: 1;
        }
        50% {
          transform: scale(1.1) rotate(180deg);
          opacity: 0.7;
        }
      }
      .animate-pulse-rotate {
        animation-name: pulse;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
      }
    `}</style>
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-pulse-rotate"
          style={{
            left: heart.style.left,
            top: heart.style.top,
            animationDuration: heart.style.animationDuration,
            width: heart.style.width,
            height: heart.style.width,
          }}>
          <Heart
            style={{ width: '100%', height: '100%', transform: heart.style.transform }} />
        </div>
      ))}
    </div>
  </>);
}