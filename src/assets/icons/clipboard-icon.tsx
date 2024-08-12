import { SVGProps } from "react";

function ClipboardIcon({ fill = "#98A2B3", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.333.833A2.501 2.501 0 005.976 2.5h-.143A3.333 3.333 0 002.5 5.833V15a3.333 3.333 0 003.333 3.333h8.334A3.333 3.333 0 0017.5 15V5.833A3.333 3.333 0 0014.167 2.5h-.143A2.501 2.501 0 0011.667.833H8.333zm-.833 2.5c0-.46.373-.833.833-.833h3.334a.833.833 0 010 1.667H8.333a.833.833 0 01-.833-.834zm-3.333 2.5c0-.92.746-1.666 1.666-1.666h.143a2.501 2.501 0 002.357 1.666h3.334a2.501 2.501 0 002.357-1.666h.143c.92 0 1.666.746 1.666 1.666V15c0 .92-.746 1.667-1.666 1.667H5.833c-.92 0-1.666-.747-1.666-1.667V5.833z"
        fill={fill}
      />
    </svg>
  );
}

export default ClipboardIcon;
