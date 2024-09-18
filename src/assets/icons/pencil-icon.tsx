import { SVGProps } from "react";

function PencilIcon({
  className,
  fill = "#667185",
  width = 12,
  height = 12,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.298 1.455a1.724 1.724 0 00-2.438 0L3.597 5.718a2 2 0 00-.566 1.131l-.123.865a1 1 0 001.131 1.131l.865-.123a2 2 0 001.131-.566l4.263-4.263a1.724 1.724 0 000-2.438zm-1.626.62a.724.724 0 011.006 1.007L8.672 2.075zm-.716.699L8.98 3.798 5.328 7.449a1 1 0 01-.566.283l-.864.123.123-.864a1 1 0 01.283-.566l3.652-3.651z"
        fill={fill}
      />
      <path
        d="M3 1a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V6a.5.5 0 00-1 0v3a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1h1.342a.5.5 0 100-1H3z"
        fill={fill}
      />
    </svg>
  );
}

export default PencilIcon;
