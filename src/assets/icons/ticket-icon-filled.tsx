import { SVGProps } from "react";

function TicketIconFilled({
  fill = "#133205",
  width = 20,
  height = 20,
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.25.667h9.084a2 2 0 012 2v.727a2 2 0 01-.336 1.11l-.354.53a2 2 0 00-.125 2.004l.604 1.206a2 2 0 01.21.895v.194a2 2 0 01-2 2h-9a2 2 0 01-2-2V9.24a2 2 0 01.305-1.06l.7-1.12a2 2 0 000-2.12L.566 3.705A1.986 1.986 0 012.25.667zm2.084 1.666a.667.667 0 00-1.334 0v1.334a.667.667 0 001.334 0V2.333zm-.667 2.334c.368 0 .667.298.667.666v1.334a.667.667 0 01-1.334 0V5.333c0-.368.299-.666.667-.666zm.667 3.666a.667.667 0 00-1.334 0v1.334a.667.667 0 001.334 0V8.333z"
        fill={fill}
      />
    </svg>
  );
}

export default TicketIconFilled;
