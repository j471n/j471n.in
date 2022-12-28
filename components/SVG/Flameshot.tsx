import { useDarkMode } from "@context/darkModeContext";

export default function Flameshot({ className }: { className?: string }) {
  const { isDarkMode } = useDarkMode();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
    >
      <g clipPath="url(#clip0_1404_14)">
        <path
          d="M16 0C24.85 0 32 7.15 32 16C32 24.85 24.85 32 16 32C7.15 32 0 24.85 0 16C0 7.15 7.15 0 16 0Z"
          fill="currentColor"
        />
        <path
          d="M17.1508 13.8819C26.4278 12.0912 26.7842 8.04529 26.7842 8.04529C26.7842 8.04529 26.0536 20.5842 19.2738 21.2476C10.6823 22.0882 9.39868 26.1413 9.39868 26.1413C9.39868 26.1413 11.6963 14.9347 17.1508 13.8819Z"
          fill={isDarkMode ? "#666" : "#777"}
        />
        <path
          d="M11.5533 13.3286C19.414 9.99951 18.6941 4.56873 18.6941 4.56873C18.6941 4.56873 23.034 15.6479 16.5279 18.2308C9.25981 21.1161 9.58321 26.0448 9.58321 26.0448C9.58321 26.0448 6.93658 15.2838 11.5533 13.3286V13.3286Z"
          fill={isDarkMode ? "#444" : "#999"}
        />
        <path
          d="M6.92249 16.2738C11.3389 10.4502 10.3455 6.36566 10.3455 6.36566C10.3455 6.36566 16.0039 13.4608 12.1536 17.8553C7.85232 22.7645 9.72553 26.1798 9.72553 26.1798C9.72553 26.1798 4.3894 19.6141 6.92249 16.2738V16.2738Z"
          fill={isDarkMode ? "#000" : "#fff"}
        />
      </g>
      <defs>
        <clipPath id="clip0_1404_14">
          <rect width={32} height={32} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
