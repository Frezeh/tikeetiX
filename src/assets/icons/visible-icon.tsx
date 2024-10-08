function VisibleIcon({
  className,
  fill = "#13191C",
  width = 21,
  height = 20,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M4.079 11.652a.833.833 0 11-1.427.862 11.477 11.477 0 01-.703-1.354 1.538 1.538 0 01.07-1.369c.36-.641 1.268-2.125 2.667-3.458C6.082 5.003 8.046 3.75 10.5 3.75c2.453 0 4.417 1.253 5.813 2.583 1.4 1.333 2.308 2.817 2.667 3.458.235.421.263.923.07 1.37-.135.31-.364.793-.703 1.353a.833.833 0 11-1.426-.862c.272-.45.46-.84.575-1.098-.338-.596-1.139-1.877-2.332-3.014-1.233-1.175-2.806-2.123-4.664-2.123-1.859 0-3.431.948-4.664 2.123-1.194 1.137-1.995 2.418-2.333 3.014.115.258.304.648.576 1.098z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 6.667a4.167 4.167 0 100 8.333 4.167 4.167 0 000-8.333zM8 10.833a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z"
        fill={fill}
      />
    </svg>
  );
}

export default VisibleIcon;
