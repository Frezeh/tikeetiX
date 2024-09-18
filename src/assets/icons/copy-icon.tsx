import { SVGProps } from "react";

function CopyIcon({
  className,
  fill = "#667185",
  width = 20,
  height = 20,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.666 1.667A3.333 3.333 0 008.333 5v1.667H5A3.333 3.333 0 001.667 10v5A3.333 3.333 0 005 18.333h3.333A3.333 3.333 0 0011.666 15v-1.667H15A3.333 3.333 0 0018.333 10V5A3.333 3.333 0 0015 1.667h-3.334zm0 10H15c.92 0 1.666-.746 1.666-1.667V5c0-.92-.746-1.667-1.666-1.667h-3.334C10.746 3.333 10 4.08 10 5v2.113A3.332 3.332 0 0111.666 10v1.667zM3.333 10c0-.92.746-1.667 1.667-1.667h3.333C9.253 8.333 10 9.08 10 10v5c0 .92-.746 1.667-1.667 1.667H5c-.92 0-1.667-.746-1.667-1.667v-5z"
        fill={fill}
      />
    </svg>
  );
}

export default CopyIcon;
