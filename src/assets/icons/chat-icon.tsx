import { SVGProps } from "react";

function ChatIcon({ fill = "#fff", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M4 8a1 1 0 011-1h5a1 1 0 110 2H5a1 1 0 01-1-1zM5 11a1 1 0 100 2h9a1 1 0 100-2H5z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 10C0 4.477 4.477 0 10 0s10 4.477 10 10-4.477 10-10 10c-.832 0-1.642-.102-2.417-.294l-5.544-.693a2.125 2.125 0 01-1.833-2.458l.343-2.058a.125.125 0 000-.036l-.255-2.044A10.02 10.02 0 010 10zm10-8a8 8 0 00-7.752 9.985l.016.061.27 2.167c.026.204.022.41-.012.613l-.343 2.058a.125.125 0 00.108.144l5.667.708.06.016A8 8 0 1010 2z"
        fill={fill}
      />
    </svg>
  );
}

export default ChatIcon;
