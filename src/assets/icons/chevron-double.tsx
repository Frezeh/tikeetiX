import { SVGProps } from "react";

function ChevronDouble({ fill = "#13191C", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg width={21} height={20} viewBox="0 0 21 20" fill="none" {...props}>
      <path
        d="M11.09 2.744a.833.833 0 00-1.18 0l-5 5a.833.833 0 001.18 1.179l4.41-4.411 4.41 4.41a.833.833 0 101.18-1.178l-5-5zM11.09 18.09a.834.834 0 01-1.18 0l-5-5a.833.833 0 011.18-1.18l4.41 4.412 4.41-4.411a.833.833 0 011.18 1.178l-5 5z"
        fill={fill}
      />
    </svg>
  );
}

export default ChevronDouble;
