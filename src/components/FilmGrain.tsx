import { CSSProperties } from "react";

interface FilmGrainProps {
  className?: string;
  style?: CSSProperties;
}

export default function FilmGrain({ className = "", style }: FilmGrainProps) {
  return (
    <div
      aria-hidden="true"
      className={`film-grain pointer-events-none ${className}`}
      style={style}
    />
  );
}
