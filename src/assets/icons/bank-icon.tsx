import { SVGProps } from "react";

function BankIcon({
  className,
  fill = "#13191C",
  width = 12,
  height = 13,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 13"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.316 1.579a1 1 0 00-.632 0l-4 1.333A1 1 0 001 3.861V5a1 1 0 001 1h.5v2.5H2a1 1 0 00-1 1v1a1 1 0 001 1h8a1 1 0 001-1v-1a1 1 0 00-1-1h-.5V6h.5a1 1 0 001-1V3.86a1 1 0 00-.684-.949l-4-1.333zM8.5 8.5V6h-1v2.5h1zm-2 0V6h-1v2.5h1zm-2 0V6h-1v2.5h1zM2 9.5v1h8v-1H2zM2 5V3.86l4-1.333 4 1.334V5H2z"
        fill={fill}
      />
    </svg>
  );
}

export default BankIcon;
