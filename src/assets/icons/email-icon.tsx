import { SVGProps } from "react";

function EmailIcon({
  color = "#13191C",
  width = 20,
  height = 20,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg width={21} height={20} viewBox="0 0 21 20" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.334 17.5a3.333 3.333 0 003.333-3.333V6.686v-.853A3.333 3.333 0 0016.333 2.5H4.668a3.333 3.333 0 00-3.333 3.333v8.333A3.333 3.333 0 004.667 17.5h11.667zM3 14.167c0 .92.746 1.666 1.667 1.666h11.667c.92 0 1.666-.746 1.666-1.666v-6.27l-6.262 2.505a3.333 3.333 0 01-2.476 0L3 7.898v6.269zm8.12-5.312L18 6.102v-.269c0-.92-.746-1.666-1.666-1.666H4.667C3.747 4.167 3 4.913 3 5.833v.27l6.881 2.752c.398.159.84.159 1.238 0z"
        fill={color}
      />
    </svg>
  );
}

export default EmailIcon;
