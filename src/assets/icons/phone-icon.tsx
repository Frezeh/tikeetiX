import { SVGProps } from "react";

function PhoneIcon({
  className,
  fill = "#98A2B3",
  width = 20,
  height = 20,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.71 1.25a3.333 3.333 0 013.333 3.333v10.834a3.333 3.333 0 01-3.334 3.333h-5a3.333 3.333 0 01-3.333-3.333V4.583A3.333 3.333 0 017.709 1.25h5zM6.042 4.583c0-.92.746-1.666 1.666-1.666h.488a1.25 1.25 0 001.179.833h1.667a1.25 1.25 0 001.179-.833h.487c.92 0 1.667.746 1.667 1.666v10.834c0 .92-.746 1.666-1.667 1.666h-5c-.92 0-1.666-.746-1.666-1.666V4.583z"
        fill={fill}
      />
    </svg>
  );
}

export default PhoneIcon;
