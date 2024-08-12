import { SVGProps } from "react";

function TicketDivider({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={93} viewBox="0 0 20 93" fill="none" {...props}>
      <path d="M1.234 0v16.324c0 6.628 5.372 12 12 12h5.92" stroke="#D0D5DD" />
      <path d="M1.234 0v49.17c0 6.627 5.372 12 12 12h5.92" stroke="#D0D5DD" />
      <path d="M1.234 0v79.819c0 6.627 5.372 12 12 12h5.92" stroke="#D0D5DD" />
    </svg>
  );
}

export default TicketDivider;
