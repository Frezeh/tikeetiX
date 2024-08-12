import * as React from "react";

function SuccessIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x={0.5} y={0.5} width={23} height={23} rx={7.5} fill="#E7F6EC" />
      <rect x={0.5} y={0.5} width={23} height={23} rx={7.5} stroke="#B5E3C4" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm1.838-5.131a.5.5 0 00-.676-.738l-1.846 1.691-.478-.438a.5.5 0 00-.676.737l.817.748a.5.5 0 00.675 0l2.184-2z"
        fill="#04802E"
      />
    </svg>
  );
}

export default SuccessIcon;
