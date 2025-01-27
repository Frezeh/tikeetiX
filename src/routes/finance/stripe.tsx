import * as React from "react";

function StripeIcon({ ...props }) {
  return (
    <svg width={32} height={33} viewBox="0 0 32 33" fill="none" {...props}>
      <rect x={0.5} y={1} width={31} height={31} rx={7.5} fill="#fff" />
      <rect x={0.5} y={1} width={31} height={31} rx={7.5} stroke="#E4E7EC" />
      <path
        d="M2.872 6.868C2 8.58 2 10.82 2 15.3v2.4c0 4.48 0 6.72.872 8.432a8 8 0 003.496 3.496c1.711.872 3.952.872 8.432.872h2.4c4.48 0 6.72 0 8.432-.872a8 8 0 003.496-3.496C30 24.42 30 22.18 30 17.7v-2.4c0-4.48 0-6.72-.872-8.432a8 8 0 00-3.496-3.496C23.92 2.5 21.68 2.5 17.2 2.5h-2.4c-4.48 0-6.72 0-8.432.872a8 8 0 00-3.496 3.496z"
        fill="url(#paint0_linear_1916_95099)"
      />
      <path
        d="M2.265 8.779C2 10.286 2 12.286 2 15.299v2.4c0 4.48 0 6.721.872 8.432a8 8 0 003.496 3.497c1.711.872 3.952.872 8.432.872h2.4c4.48 0 6.72 0 8.432-.872a8 8 0 003.496-3.497C30 24.421 30 22.18 30 17.7v-2.4c0-4.481 0-6.721-.872-8.432a8 8 0 00-3.34-3.415L2.265 8.78z"
        fill="url(#paint1_linear_1916_95099)"
      />
      <path
        d="M29.71 24.354c-.128.675-.314 1.251-.582 1.777a8 8 0 01-3.496 3.497c-1.66.845-3.818.87-8.036.871H16.06v-3.163l13.651-2.982z"
        fill="url(#paint2_linear_1916_95099)"
      />
      <path
        d="M17.2 2.5h-2.4c-.872 0-1.659 0-2.373.006v3.965l13.358-3.019a7.861 7.861 0 00-.153-.08c-.95-.484-2.063-.7-3.632-.795-1.257-.077-2.807-.077-4.8-.077z"
        fill="url(#paint3_linear_1916_95099)"
      />
      <path
        d="M30 17.874c0 3.005-.005 4.986-.29 6.48l-4.748 1.038v-7.076L30 17.145v.729z"
        fill="url(#paint4_linear_1916_95099)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.94 13.878c0-.643.526-.89 1.397-.89 1.248 0 2.824.379 4.072 1.055V10.17c-1.363-.544-2.71-.758-4.072-.758-3.334 0-5.55 1.747-5.55 4.664 0 4.548 6.24 3.823 6.24 5.784 0 .758-.658 1.005-1.577 1.005-1.363 0-3.103-.56-4.483-1.318v3.922c1.527.659 3.07.939 4.483.939 3.415 0 5.763-1.697 5.763-4.647-.016-4.91-6.272-4.037-6.272-5.883z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1916_95099"
          x1={2}
          y1={2.5}
          x2={11.1967}
          y2={9.00209}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#392993" />
          <stop offset={1} stopColor="#4B47B9" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1916_95099"
          x1={3.05439}
          y1={9.07394}
          x2={23.3566}
          y2={25.8204}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#594BB9" />
          <stop offset={1} stopColor="#60A8F2" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1916_95099"
          x1={16.0586}
          y1={27.4535}
          x2={30}
          y2={30.4995}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#61A2EF" />
          <stop offset={1} stopColor="#58E6FD" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_1916_95099"
          x1={12.4268}
          y1={4.49163}
          x2={30}
          y2={2.5}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#534EBE" />
          <stop offset={1} stopColor="#6875E2" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_1916_95099"
          x1={24.9624}
          y1={18.3747}
          x2={30.0001}
          y2={24.4081}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#71A5F3" />
          <stop offset={1} stopColor="#6CC3FA" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default StripeIcon;
