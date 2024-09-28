import { SVGProps } from "react";

function AiStars({
  fill = "#fff",
  className,
  gradient,
  width = 21,
  height = 20,
  ...props
}: SVGProps<SVGSVGElement> & {
  gradient?: boolean;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
      className={className}
      {...props}
    >
      {gradient ? (
        <>
          <path
            d="M3.283 6.15A2.266 2.266 0 001.85 4.717c-.689-.23-.689-1.204 0-1.434A2.266 2.266 0 003.283 1.85c.23-.689 1.204-.689 1.434 0A2.266 2.266 0 006.15 3.283c.689.23.689 1.204 0 1.434A2.266 2.266 0 004.717 6.15c-.23.689-1.204.689-1.434 0z"
            fill="url(#paint0_linear_3002_23875)"
          />
          <path
            d="M8.746 13.763a3.966 3.966 0 00-2.509-2.509c-1.205-.402-1.205-2.106 0-2.508a3.966 3.966 0 002.509-2.509c.402-1.205 2.107-1.205 2.508 0a3.966 3.966 0 002.509 2.509c1.205.402 1.205 2.106 0 2.508a3.966 3.966 0 00-2.509 2.509c-.401 1.205-2.106 1.205-2.508 0z"
            fill="url(#paint1_linear_3002_23875)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_3002_23875"
              x1={1.3335}
              y1={8.00004}
              x2={14.6668}
              y2={8.00004}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#75E0D3" />
              <stop offset={0.265} stopColor="#7246F5" />
              <stop offset={0.545} stopColor="#B933C8" />
              <stop offset={0.78} stopColor="#DD7455" />
              <stop offset={1} stopColor="#F0CF73" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_3002_23875"
              x1={1.3335}
              y1={8.00004}
              x2={14.6668}
              y2={8.00004}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#75E0D3" />
              <stop offset={0.265} stopColor="#7246F5" />
              <stop offset={0.545} stopColor="#B933C8" />
              <stop offset={0.78} stopColor="#DD7455" />
              <stop offset={1} stopColor="#F0CF73" />
            </linearGradient>
          </defs>
        </>
      ) : (
        <path
          d="M4.604 7.688a2.833 2.833 0 00-1.792-1.792c-.86-.287-.86-1.505 0-1.792a2.833 2.833 0 001.792-1.792c.287-.86 1.505-.86 1.792 0 .282.846.946 1.51 1.792 1.792.86.287.86 1.505 0 1.792a2.833 2.833 0 00-1.792 1.792c-.287.86-1.505.86-1.792 0zM11.432 17.203a4.958 4.958 0 00-3.135-3.135c-1.507-.502-1.507-2.634 0-3.136a4.958 4.958 0 003.135-3.135c.502-1.507 2.633-1.507 3.136 0a4.958 4.958 0 003.135 3.135c1.507.502 1.507 2.634 0 3.136a4.958 4.958 0 00-3.135 3.135c-.502 1.507-2.634 1.507-3.136 0z"
          fill={fill}
        />
      )}
    </svg>
  );
}

export default AiStars;
