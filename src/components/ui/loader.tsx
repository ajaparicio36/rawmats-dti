import React from "react";

interface SnakeLoaderProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
}

const SnakeLoader = ({
  size = 40,
  strokeWidth = 4,
  color = "#9BD0F3",
}: SnakeLoaderProps = {}) => {
  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className="snake-loader"
        />
      </svg>
      <style jsx>{`
        .snake-loader {
          stroke-dasharray: 62.83185307179586;
          stroke-dashoffset: 0;
          transform-origin: center;
          animation: snake 1.4s ease-in-out infinite;
        }
        @keyframes snake {
          0% {
            stroke-dashoffset: 62.83185307179586;
            transform: rotate(0deg);
          }
          50% {
            stroke-dashoffset: 0;
            transform: rotate(180deg);
          }
          100% {
            stroke-dashoffset: -62.83185307179586;
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export { SnakeLoader };
