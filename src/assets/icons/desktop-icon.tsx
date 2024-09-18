import { SVGProps } from "react";

function DesktopIcon({
  className,
  fill = "#13191C",
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
        d="M4.376 1.25a3.333 3.333 0 00-3.333 3.333v8.334a3.333 3.333 0 003.333 3.333h11.667a3.333 3.333 0 003.333-3.333V4.583a3.333 3.333 0 00-3.333-3.333H4.376zM2.71 4.583c0-.92.746-1.666 1.666-1.666h11.667c.92 0 1.667.746 1.667 1.666v8.334c0 .92-.747 1.666-1.667 1.666H4.376c-.92 0-1.666-.746-1.666-1.666V4.583z"
        fill={fill}
      />
      <path
        d="M1.876 17.083a.833.833 0 000 1.667h16.667a.833.833 0 000-1.667H1.876z"
        fill={fill}
      />
    </svg>
  );
}

export default DesktopIcon;
