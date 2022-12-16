import { useDarkMode } from "@context/darkModeContext";

export default function Flux() {
  const { isDarkMode } = useDarkMode();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="currentColor"
      className="utilities-svg"
    >
      <g clipPath="url(#clip0_741_34)">
        <path
          d="M0 16C0 7.16344 7.16344 0 16 0V0C24.8366 0 32 7.16344 32 16V16C32 24.8366 24.8366 32 16 32V32C7.16344 32 0 24.8366 0 16V16Z"
          fill="currentColor"
        />
        <circle
          cx="22.6455"
          cy="17.5662"
          r="4.65609"
          fill="#9B9B9B"
          stroke={isDarkMode ? "black" : "white"}
          strokeWidth="1"
        />
        <path
          d="M30.9635 28.1791C30.9635 34.0935 17.838 31.8614 11.9236 31.8614C6.00918 31.8614 1.3739 28.8871 1.3739 22.9727C-3.07865 20.8706 4.19449 12.6984 10.3075 12.6984C20.0853 12.6984 30.2863 23.5295 30.9635 28.1791Z"
          fill="#454545"
        />
      </g>
      <defs>
        <clipPath id="clip0_741_34">
          <path
            d="M0 16C0 7.16344 7.16344 0 16 0V0C24.8366 0 32 7.16344 32 16V16C32 24.8366 24.8366 32 16 32V32C7.16344 32 0 24.8366 0 16V16Z"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
