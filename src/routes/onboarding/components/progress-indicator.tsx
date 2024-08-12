function ProgressIndicator({ step = 1, ...props }: { step?: 1 | 2 }) {
  return (
    <svg
      width={352}
      height={24}
      viewBox="0 0 352 24"
      fill="none"
      {...props}
      className="trasition-all duration-300"
    >
      <path
        d="M21.5 12h309"
        stroke={step === 2 ? "#0DA767" : "#D0D5DD"}
        strokeWidth={1.5}
      />
      <path d="M24.5 12h149" stroke="#0DA767" strokeWidth={1.5} />
      <g clipPath="url(#clip0_78_3103)">
        <rect width={24} height={24} rx={4} fill="#0DA767" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.38 7.085c.23.21.245.566.035.795l-8.25 9a.563.563 0 01-.813.018l-3.75-3.75a.563.563 0 01.796-.796l3.334 3.335 7.853-8.567a.563.563 0 01.795-.035z"
          fill="#fff"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g clipPath="url(#clip1_78_3103)">
        <rect
          x={327.5}
          width={24}
          height={24}
          rx={4}
          fill={step === 2 ? "#0DA767" : "#D0D5DD"}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M345.88 7.085c.229.21.245.566.035.795l-8.25 9a.564.564 0 01-.813.018l-3.75-3.75a.564.564 0 01.796-.796l3.334 3.335 7.853-8.567a.563.563 0 01.795-.035z"
          fill="#fff"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_78_3103">
          <rect width={24} height={24} rx={12} fill="#fff" />
        </clipPath>
        <clipPath id="clip1_78_3103">
          <rect x={327.5} width={24} height={24} rx={12} fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default ProgressIndicator;
