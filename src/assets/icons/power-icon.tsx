import * as React from "react";

function PowerIcon({
  className,
  fill = "#BD1B0F",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.978 2.56a.7.7 0 10-1.4 0v.74a6.301 6.301 0 101.4 0v-.74zm-1.4 2.15v3.45a.7.7 0 001.4 0V4.71a4.901 4.901 0 11-1.4 0z"
        fill={fill}
      />
    </svg>
  );
}

export default PowerIcon;
