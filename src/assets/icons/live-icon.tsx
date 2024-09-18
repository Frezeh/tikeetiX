import * as React from "react";

function LiveIcon({
  className,
  fill = "#0F8755",
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
        d="M6.14 2.28c-1.748-.874-3.807.397-3.807 2.353v6.735c0 1.955 2.059 3.226 3.808 2.352l6.738-3.368c1.94-.969 1.94-3.735 0-4.704L6.14 2.28zM3.668 4.633a1.297 1.297 0 011.877-1.16l6.739 3.367c.956.478.956 1.842 0 2.32l-6.739 3.367a1.297 1.297 0 01-1.877-1.16V4.634z"
        fill={fill}
      />
    </svg>
  );
}

export default LiveIcon;
