import { SVGProps } from "react";

function AirplaneIcon({
  className,
  fill = "#D0D5DD",
  width = 24,
  height = 24,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M8.66667 24L11.3333 24L15.78 14L22 14C23.1067 14 24 13.1067 24 12C24 10.8933 23.1067 10 22 10L15.78 10L11.3333 -5.53678e-07L8.66667 -6.70241e-07L11.4467 10L3.52667 10L2 7.33333L3.49415e-06 7.33333L1.33334 12L3.08617e-06 16.6667L2 16.6667L3.52667 14L11.4467 14L8.66667 24Z"
        fill="#D0D5DD"
      />
    </svg>
  );
}

export default AirplaneIcon;
