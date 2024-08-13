interface IProps {
  className?: string;
}

export const BatteryIcon: React.FC<IProps> = ({ className }) => {
  return (
    <svg
      id="battery"
      className={className}
      viewBox="-15 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="24"
    >
      <g
        stroke="currentColor"
        fill="none"
        fill-rule="evenodd"
        transform="translate(1.000000, 1.000000)"
      >
        <path
          stroke-width="6"
          d="M30,5 L24,5 L24,2 C24,0.9 23.1,0 22,0 L11,0 C9.9,0 9,0.9 9,2 L9,5 L2,5 C0.9,5 0,5.9 0,7 L0,60 C0,61.1 0.9,62 2,62 L30,62 C31.1,62 32,61.1 32,60 L32,7 C32,5.9 31.1,5 30,5 L30,5 Z"
        />
        <path
          d="M11.7,52.2 L23.2,28 L16,30.5 L19.3,13.8 L8,36.9 L15.3,33.9 L11.7,52.2 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
