import { SVGProps } from "react";

function ButtonGradient({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.024 2.459c-.649-1.945-3.4-1.945-4.048 0A2.4 2.4 0 012.46 3.976c-1.945.649-1.945 3.4 0 4.048A2.4 2.4 0 013.976 9.54c.649 1.945 3.4 1.945 4.048 0A2.4 2.4 0 019.54 8.024c1.945-.649 1.945-3.4 0-4.048A2.4 2.4 0 018.024 2.46zm-2.15.632c.016-.048.035-.063.044-.07A.148.148 0 016 3c.038 0 .066.011.082.022.01.006.028.02.044.07A4.4 4.4 0 008.91 5.873c.048.016.063.035.07.044.01.016.021.044.021.082a.148.148 0 01-.022.082c-.006.01-.02.028-.07.044A4.4 4.4 0 006.127 8.91c-.016.048-.035.063-.044.07A.148.148 0 016 9a.148.148 0 01-.082-.022c-.01-.006-.028-.02-.044-.07A4.4 4.4 0 003.09 6.127c-.048-.016-.063-.035-.07-.044A.148.148 0 013 6c0-.038.011-.066.022-.082.006-.01.02-.028.07-.044A4.4 4.4 0 005.873 3.09z"
        fill="url(#paint0_linear_3003_5202)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.83 9.04c-.906-2.72-4.753-2.72-5.66 0a4.949 4.949 0 01-3.13 3.13c-2.72.906-2.72 4.754 0 5.66a4.95 4.95 0 013.13 3.13c.906 2.72 4.754 2.72 5.66 0a4.95 4.95 0 013.13-3.13c2.72-.906 2.72-4.753 0-5.66a4.95 4.95 0 01-3.13-3.13zm-3.763.632c.3-.896 1.567-.896 1.866 0a6.95 6.95 0 004.395 4.395c.896.3.896 1.567 0 1.866a6.95 6.95 0 00-4.395 4.395c-.3.896-1.567.896-1.866 0a6.95 6.95 0 00-4.395-4.395c-.896-.3-.896-1.567 0-1.866a6.95 6.95 0 004.395-4.395z"
        fill="url(#paint1_linear_3003_5202)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3003_5202"
          x1={1}
          y1={12}
          x2={23}
          y2={12}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#75E0D3" />
          <stop offset={0.265} stopColor="#7246F5" />
          <stop offset={0.545} stopColor="#B933C8" />
          <stop offset={0.78} stopColor="#DD7455" />
          <stop offset={1} stopColor="#F0CF73" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3003_5202"
          x1={1}
          y1={12}
          x2={23}
          y2={12}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#75E0D3" />
          <stop offset={0.265} stopColor="#7246F5" />
          <stop offset={0.545} stopColor="#B933C8" />
          <stop offset={0.78} stopColor="#DD7455" />
          <stop offset={1} stopColor="#F0CF73" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default ButtonGradient;
