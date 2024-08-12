import * as React from "react";

function InfoIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x={1} y={0.5} width={23} height={23} rx={7.5} fill="#E3EFFC" />
      <rect x={1} y={0.5} width={23} height={23} rx={7.5} stroke="#C6DDF7" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm1.838-5.131a.5.5 0 00-.676-.738l-1.846 1.691-.478-.438a.5.5 0 00-.676.737l.817.748a.5.5 0 00.675 0l2.184-2z"
        fill="#1671D9"
      />
    </svg>
  );
}

export default InfoIcon;
