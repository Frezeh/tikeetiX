function Dots({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={65}
      height={39}
      viewBox="0 0 65 39"
      fill="none"
      {...props}
      aria-hidden="true"
      className={className}
    >
      <g opacity={0.5} fill="#fff">
        <circle opacity={0.3} cx={4.8103} cy={13.5517} r={2} />
        <circle opacity={0.7} cx={30.2241} cy={2} r={2} />
        <circle opacity={0.2} cx={62.569} cy={6.62069} r={2} />
        <circle opacity={0.3} cx={51.0172} cy={32.0345} r={2} />
        <circle opacity={0.7} cx={25.6034} cy={36.6552} r={2} />
        <circle opacity={0.3} cx={2.5} cy={34.3448} r={2} />
      </g>
    </svg>
  );
}

export default Dots;
