export default function RainDrop() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="35"
      viewBox="0 0 32 35"
      fill="currentColor"
      className="utilities-svg"
    >
      <path
        d="M13.3433 13.6108C17.1634 17.0095 15.8846 24.5064 15.8846 27.8684C10.8766 27.8684 7.307 28.3185 4.09012 26.3952C0.217283 24.0796 0.108804 18.6472 2.664 15.1169C5.21919 11.5867 10.1254 10.7479 13.3433 13.6108Z"
        fill="#454545"
      />
      <path
        d="M18.5482 13.7231C14.7622 17.0326 15.9116 24.5606 15.8844 27.8684C20.8117 27.9137 24.3683 28.2484 27.5489 26.3851C31.3781 24.1418 31.5288 18.7979 29.0434 15.3014C26.5579 11.8049 21.7374 10.9354 18.5482 13.7231Z"
        fill="#9F9F9F"
      />
      <g filter="url(#filter0_d_745_19)">
        <path
          d="M25.8466 13.5213C25.8466 20.3855 18.6544 24.6615 15.884 27.8685C12.4211 23.5925 5.92139 20.2167 5.92139 13.5213C5.92139 7.71055 10.3818 3 15.884 3C21.3862 3 25.8466 7.71055 25.8466 13.5213Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_745_19"
          x="0.921387"
          y="0"
          width="29.9253"
          height="34.8687"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_745_19"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_745_19"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
