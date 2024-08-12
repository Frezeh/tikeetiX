import { SVGProps } from "react";

function OrganizationBg({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={174}
      height={99}
      viewBox="0 0 174 99"
      fill="none"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_887_28960)" fill="#FFB21D">
        <circle opacity={0.2} cx={148.838} cy={24.0984} r={33.5726} />
        <circle cx={148.838} cy={24.0984} r={19.0068} />
      </g>
      <defs>
        <clipPath id="clip0_887_28960">
          <rect x={0.827271} width={172.5} height={99} rx={5} fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default OrganizationBg;
