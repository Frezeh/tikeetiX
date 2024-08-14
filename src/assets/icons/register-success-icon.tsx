import * as React from "react";

function RegisterSuccessIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={161}
      height={160}
      viewBox="0 0 161 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        opacity={0.1}
        cx={80.4996}
        cy={81.143}
        r={68.5714}
        fill="#9DF316"
      />
      <circle opacity={0.3} cx={80.5} cy={81} r={52.5} fill="#9DF316" />
      <circle cx={80.5} cy={81} r={37.5} fill="#9DF316" />
      <path
        d="M80.418 51.736c-15.804 0-28.682 12.878-28.682 28.682 0 15.803 12.878 28.681 28.682 28.681 15.803 0 28.681-12.878 28.681-28.681 0-15.804-12.878-28.682-28.681-28.682zm13.71 22.085L77.864 90.083a2.15 2.15 0 01-3.04 0l-8.117-8.117a2.164 2.164 0 010-3.04 2.164 2.164 0 013.04 0l6.597 6.597L91.087 70.78a2.164 2.164 0 013.04 0c.832.831.832 2.18 0 3.04z"
        fill="#001F1C"
      />
    </svg>
  );
}

export default RegisterSuccessIcon;
