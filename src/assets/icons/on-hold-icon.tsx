import * as React from "react";

function OnHoldIcon({
  className,
  fill = "#D18411",
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
        d="M3.333 2A2.667 2.667 0 00.667 4.667v6.666A2.667 2.667 0 003.333 14h1.334a2.667 2.667 0 002.666-2.667V4.667A2.667 2.667 0 004.667 2H3.333zM2 4.667c0-.737.597-1.334 1.333-1.334h1.334C5.403 3.333 6 3.93 6 4.667v6.666c0 .737-.597 1.334-1.333 1.334H3.333A1.333 1.333 0 012 11.333V4.667zM10.667 2A2.667 2.667 0 008 4.667v6.666A2.667 2.667 0 0010.667 14H12a2.667 2.667 0 002.667-2.667V4.667A2.667 2.667 0 0012 2h-1.333zM9.333 4.667c0-.737.597-1.334 1.334-1.334H12c.736 0 1.333.597 1.333 1.334v6.666c0 .737-.597 1.334-1.333 1.334h-1.333a1.333 1.333 0 01-1.334-1.334V4.667z"
        fill={fill}
      />
    </svg>
  );
}

export default OnHoldIcon;
