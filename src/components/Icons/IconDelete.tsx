import { IconProps } from "./types";

export const IconDelete = ({
  className,
  color = "currentColor",
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      >
        <path d="M10 12v5" />
        <path d="M14 12v5" />
        <path d="M4 7h16" />
        <path d="M6 10v8a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-8" />
        <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5Z" />
      </g>
    </svg>
  );
};
