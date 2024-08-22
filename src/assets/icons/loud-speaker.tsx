import { SVGProps } from "react";

function LoudSpeaker({ fill = "#98A2B3", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.167 2.858a1.667 1.667 0 00-2.238-1.566l-6.082 2.22-6.107.477a3.333 3.333 0 00-3.073 3.323v1.21a3.333 3.333 0 003.073 3.322l.344.027.586 5.095a2.485 2.485 0 104.937-.58l-.492-4.121.732.057 6.082 2.22a1.667 1.667 0 002.238-1.566V2.857zM4.87 5.65l5.322-.417V10.6l-5.322-.416A1.667 1.667 0 013.333 8.52V7.312c0-.87.67-1.594 1.537-1.661zm12.63 7.325l-5.641-2.059v-6l5.641-2.06v10.119zm-10.174 3.8l-.55-4.772 1.644.128.532 4.452a.818.818 0 11-1.626.191z"
        fill={fill}
      />
    </svg>
  );
}

export default LoudSpeaker;
