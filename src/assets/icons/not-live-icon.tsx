import * as React from "react";

function NotLiveIcon({
  className,
  fill = "#13191C",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.667 1.667a4 4 0 00-4 4v4.666a4 4 0 004 4h4.666a4 4 0 004-4V5.667a4 4 0 00-4-4H5.667zm-2 4a2 2 0 012-2h4.666a2 2 0 012 2v4.666a2 2 0 01-2 2H5.667a2 2 0 01-2-2V5.667z"
        fill={fill}
      />
    </svg>
  );
}

export default NotLiveIcon;
