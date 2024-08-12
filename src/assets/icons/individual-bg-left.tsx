import { SVGProps } from "react";

function IndividualBgLeft({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={173}
      height={99}
      viewBox="0 0 173 99"
      fill="none"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_887_28959)">
        <circle cx={53.1388} cy={69.5485} r={61.2501} fill="#FFB21D" />
      </g>
      <defs>
        <clipPath id="clip0_887_28959">
          <rect width={172.5} height={99} rx={5} fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default IndividualBgLeft;
