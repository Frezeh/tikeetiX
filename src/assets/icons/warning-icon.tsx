import * as React from "react";

function WarningIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x={0.5} y={0.5} width={23} height={23} rx={7.5} fill="#FEF6E7" />
      <rect x={0.5} y={0.5} width={23} height={23} rx={7.5} stroke="#FBE2B7" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.654 14.089l3.156-5.887c.502-.936 1.878-.936 2.38 0l3.156 5.887c.466.87-.182 1.911-1.19 1.911H8.844c-1.008 0-1.656-1.041-1.19-1.911zM12 9a.5.5 0 01.5.5V13a.5.5 0 01-1 0V9.5A.5.5 0 0112 9zm-.625 5.375a.625.625 0 101.25 0 .625.625 0 00-1.25 0z"
        fill="#DD900D"
      />
    </svg>
  );
}

export default WarningIcon;
