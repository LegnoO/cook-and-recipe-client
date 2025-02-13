import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const Logo: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => (
  <svg
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    height={size || height}
    width={size || width}
    {...props}>
    <path
      fill="currentColor"
      d="M268.608 25.48c-26.47.197-43.568 5.534-55.357 13.75c-13.473 9.39-21.036 23.152-27.08 40.974c2.562 20.932 23.94 48.19 19.657 70.38c-16.48-28.212-33.466-67.988-63.31-76.116c-17.075-4.62-36.54-5.802-43.54-1.436c-8.273 5.16-13.81 14.76-16.943 26.854c-3.132 12.095-3.66 26.237-2.69 38.285c2.432 30.134 24.784 74.997 46.92 111.093c16.58 27.035 32.78 49.416 39.87 58.953a264 264 0 0 1 22.85-5.62c-1.538-18.02 1.384-34.673.828-53.947c4.206 18.19 7.84 34.576 14.275 51.36c12.383-1.772 25.42-2.8 38.85-2.82a262 262 0 0 1 28.256 1.463l14.22-41.562l-2.373 43.103c17.118 2.644 34.412 7.158 51.38 13.978c12.21-12.758 16.877-27.402 24.99-41.186c.398 16.003-4.507 31.896-15.052 45.464c8.902 4.1 17.684 8.87 26.268 14.38c41.514-67.15 66.69-133.49 61.885-198.7c-1.497-20.33-6.088-38.187-12.69-51.105c-6.6-12.92-14.827-20.444-23.493-22.704c-6.985-1.822-24.825 2.828-39.44 9.496c-26.947 10.81-48.5 45.717-55.894 69.53c-.253-11.64 3.003-44.39 15.947-60.698c-3.98-12.57-6.914-26.394-12.085-36.362c-10.442-16.115-20.236-16.91-36.247-16.806zm-26.836 289.85c-25.985.123-50.39 4.192-70.77 10.214l-11.626 98.96c10.16-5.65 22.32-9.144 35.318-11.17c9.958-1.553 20.53-2.233 31.362-2.17q2.32.015 4.658.073c12.457.313 25.19 1.57 37.674 3.582c24.965 4.023 48.854 11.044 67.463 20.175c7.344 3.604 14.094 7.5 19.717 11.9l8.33-96.945c-38.464-25.67-82.153-34.81-122.125-34.62zm-15.84 113.86c-10.017-.06-19.652.554-28.464 1.928c-16.116 2.513-29.044 7.62-37.168 14.707c50.417 46.585 123.38 52.03 190.373 22.225c-3.786-4.99-11.387-11.32-22.752-16.897c-16.367-8.032-38.93-14.78-62.398-18.562c-13.2-2.127-26.71-3.32-39.59-3.4z"></path>
  </svg>
);

export const Menu: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    height={size || height}
    width={size || width}
    {...props}>
    <path fill="currentColor" d="M3 4h18v2H3zm0 7h18v2H3zm0 7h18v2H3z" />
  </svg>
);

export const Close: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    height={size || height}
    width={size || width}
    {...props}>
    <path
      fill="currentColor"
      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
    />
  </svg>
);

export const Twitter: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => (
  <svg
    className="fill-[currentColor] hover:fill-[#1DA1F2]"
    viewBox="0 0 1920 1920"
    xmlns="http://www.w3.org/2000/svg"
    height={size || height}
    width={size || width}
    {...props}>
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <path
        d="M1920 311.856c-70.701 33.769-146.598 56.47-226.221 66.86 81.317-52.517 143.774-135.529 173.252-234.691-76.236 48.678-160.716 84.028-250.391 103.002-71.718-82.56-174.268-134.06-287.435-134.06-217.75 0-394.165 189.966-394.165 424.206 0 33.318 3.614 65.619 10.165 96.678C617.9 616.119 327.304 447.385 133.045 190.67c-33.77 62.57-53.309 135.53-53.309 213.233 0 147.162 91.031 276.818 196.744 353.054-64.602-2.26-157.101-21.46-157.101-53.309v5.648c0 205.327 114.41 376.658 294.55 415.849-32.978 9.487-78.38 14.795-114.409 14.795-25.412 0-55.454-2.71-79.624-7.793 50.26 168.509 193.13 291.163 365.478 294.777-134.852 113.506-306.07 181.383-490.616 181.383-31.85 0-64.038-2.033-94.758-5.873 174.494 120.17 381.176 190.532 603.67 190.532 724.97 0 1121.055-646.136 1121.055-1206.55 0-18.41-.452-36.932-1.356-55.116 77.026-59.746 143.887-134.4 196.631-219.444"
        fillRule="evenodd"
      />
    </g>
  </svg>
);

export const Reddit: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => (
  <svg
    className="group"
    viewBox="0 -4 48 48"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    height={size || height}
    width={size || width}
    {...props}>
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <title>{"Reddit-color"}</title>
      <desc>{"Created with Sketch."}</desc>
      <defs />
      <g
        id="Icons"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd">
        <g
          id="Color-"
          transform="translate(-800.000000, -566.000000)"
          className="fill-[currentColor] group-hover:fill-[#FF5700]">
          <path
            d="M831.14,592.325803 C829.346,592.325803 827.8385,590.884067 827.8385,589.106421 C827.8385,587.328775 829.346,585.839477 831.14,585.839477 C832.934,585.839477 834.389,587.328775 834.389,589.106421 C834.389,590.884067 832.934,592.325803 831.14,592.325803 M831.902,598.574316 C830.231,600.228597 827.654,601.032699 824.024,601.032699 C824.0165,601.032699 824.0075,601.031213 823.9985,601.031213 C823.991,601.031213 823.982,601.032699 823.973,601.032699 C820.343,601.032699 817.7675,600.228597 816.098,598.574316 C815.585,598.065993 815.585,597.244055 816.098,596.737218 C816.6095,596.23038 817.439,596.23038 817.952,596.737218 C819.104,597.878716 821.0735,598.434602 823.973,598.434602 C823.982,598.434602 823.991,598.436088 823.9985,598.436088 C824.0075,598.436088 824.0165,598.434602 824.024,598.434602 C826.9235,598.434602 828.8945,597.878716 830.048,596.737218 C830.561,596.228894 831.3905,596.23038 831.902,596.737218 C832.4135,597.245541 832.4135,598.067479 831.902,598.574316 M813.611,589.106421 C813.611,587.330262 815.1155,585.839477 816.908,585.839477 C818.702,585.839477 820.157,587.330262 820.157,589.106421 C820.157,590.884067 818.702,592.325803 816.908,592.325803 C815.1155,592.325803 813.611,590.884067 813.611,589.106421 M839.996,568.598098 C841.211,568.598098 842.1995,569.577586 842.1995,570.780024 C842.1995,571.983948 841.211,572.963436 839.996,572.963436 C838.781,572.963436 837.7925,571.983948 837.7925,570.780024 C837.7925,569.577586 838.781,568.598098 839.996,568.598098 M848,585.570452 C848,582.417955 845.4125,579.854043 842.231,579.854043 C840.854,579.854043 839.5895,580.335612 838.5965,581.136742 C835.079,578.945898 830.615,577.62604 825.83,577.346611 L828.326,569.527051 L835.1855,571.127824 C835.3655,573.602556 837.4535,575.561534 839.996,575.561534 C842.6555,575.561534 844.82,573.416766 844.82,570.780024 C844.82,568.144768 842.6555,566 839.996,566 C838.136,566 836.519,567.049346 835.7135,568.581748 L827.7425,566.722354 C827.075,566.56629 826.4,566.94679 826.193,567.594828 L823.094,577.300535 C817.9385,577.425386 813.092,578.749703 809.3165,581.068371 C808.337,580.308859 807.1055,579.854043 805.769,579.854043 C802.5875,579.854043 800,582.417955 800,585.570452 C800,587.519025 800.99,589.241677 802.4975,590.273187 C802.4345,590.726516 802.4015,591.182818 802.4015,591.645065 C802.4015,595.585315 804.713,599.250595 808.91,601.964625 C812.933,604.567182 818.258,606 823.9025,606 C829.547,606 834.872,604.567182 838.895,601.964625 C843.092,599.250595 845.4035,595.585315 845.4035,591.645065 C845.4035,591.224435 845.375,590.806778 845.3225,590.392093 C846.9305,589.376932 848,587.594828 848,585.570452"
            id="Reddit"
          />
        </g>
      </g>
    </g>
  </svg>
);

export const Facebook: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => (
  <svg
    className="hover:fill-[#1877F2] hover:stroke-[#1877F2]"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    height={size || height}
    width={size || width}
    {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Instagram: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 551.034 551.034"
    xmlSpace="preserv"
    className="group"
    height={size || height}
    width={size || width}
    {...props}>
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <g id="SVGRepo_iconCarrier">
      <g id="XMLID_13_">
        <linearGradient
          id="InstagramGradient"
          gradientUnits="userSpaceOnUse"
          x1="275.517"
          y1="4.5714"
          x2="275.517"
          y2="549.7202"
          gradientTransform="matrix(1 0 0 -1 0 554)">
          <stop offset="0" style={{ stopColor: "#E09B3D" }} />
          <stop offset="0.3" style={{ stopColor: "#C74C4D" }} />
          <stop offset="0.6" style={{ stopColor: "#C21975" }} />
          <stop offset="1" style={{ stopColor: "#7024C4" }} />
        </linearGradient>
        <path
          id="XMLID_17_"
          className="fill-[currentColor] group-hover:fill-[url(#InstagramGradient)]"
          d="M386.878,0H164.156C73.64,0,0,73.64,0,164.156v222.722 c0,90.516,73.64,164.156,164.156,164.156h222.722c90.516,0,164.156-73.64,164.156-164.156V164.156 C551.033,73.64,477.393,0,386.878,0z M495.6,386.878c0,60.045-48.677,108.722-108.722,108.722H164.156 c-60.045,0-108.722-48.677-108.722-108.722V164.156c0-60.046,48.677-108.722,108.722-108.722h222.722 c60.045,0,108.722,48.676,108.722,108.722L495.6,386.878L495.6,386.878z"
        />
        <linearGradient
          id="XMLID_3_"
          gradientUnits="userSpaceOnUse"
          x1="275.517"
          y1="4.5714"
          x2="275.517"
          y2="549.7202"
          gradientTransform="matrix(1 0 0 -1 0 554)">
          <stop offset="0" style={{ stopColor: "#E09B3D" }} />
          <stop offset="0.3" style={{ stopColor: "#C74C4D" }} />
          <stop offset="0.6" style={{ stopColor: "#C21975" }} />
          <stop offset="1" style={{ stopColor: "#7024C4" }} />
        </linearGradient>
        <path
          id="XMLID_81_"
          className="fill-[currentColor] group-hover:fill-[url(#InstagramGradient)]"
          d="M275.517,133C196.933,133,133,196.933,133,275.516 s63.933,142.517,142.517,142.517S418.034,354.1,418.034,275.516S354.101,133,275.517,133z M275.517,362.6 c-48.095,0-87.083-38.988-87.083-87.083s38.989-87.083,87.083-87.083c48.095,0,87.083,38.988,87.083,87.083 C362.6,323.611,323.611,362.6,275.517,362.6z"
        />
        <linearGradient
          id="XMLID_4_"
          gradientUnits="userSpaceOnUse"
          x1="418.306"
          y1="4.5714"
          x2="418.306"
          y2="549.7202"
          gradientTransform="matrix(1 0 0 -1 0 554)">
          <stop offset="0" style={{ stopColor: "#E09B3D" }} />
          <stop offset="0.3" style={{ stopColor: "#C74C4D" }} />
          <stop offset="0.6" style={{ stopColor: "#C21975" }} />
          <stop offset="1" style={{ stopColor: "#7024C4" }} />
        </linearGradient>
        <circle
          id="XMLID_83_"
          className="fill-[currentColor] group-hover:fill-[url(#InstagramGradient)]"
          cx="418.306"
          cy="134.072"
          r="34.149"
        />
      </g>
    </g>
  </svg>
);

export const Linkedin: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => (
  <svg
    className="hover:fill-[#0077B5] hover:stroke-[#0077B5]"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    height={size || height}
    width={size || width}
    {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Star: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    height={size || height}
    width={size || width}
    {...props}>
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77"
      className="hover:fill-primary"
    />
    <path
      d="M12 2l-3.09 6.26L2 9.27l5 4.87-1.18 6.88L12 17.77"
      className="hover:fill-primary"
    />
  </svg>
);
