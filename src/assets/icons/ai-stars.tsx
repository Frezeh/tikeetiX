import { SVGProps } from "react"

function AiStars({ fill = "#fff", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      {...props}
    >
      <path
        d="M4.604 7.688a2.833 2.833 0 00-1.792-1.792c-.86-.287-.86-1.505 0-1.792a2.833 2.833 0 001.792-1.792c.287-.86 1.505-.86 1.792 0 .282.846.946 1.51 1.792 1.792.86.287.86 1.505 0 1.792a2.833 2.833 0 00-1.792 1.792c-.287.86-1.505.86-1.792 0zM11.432 17.203a4.958 4.958 0 00-3.135-3.135c-1.507-.502-1.507-2.634 0-3.136a4.958 4.958 0 003.135-3.135c.502-1.507 2.633-1.507 3.136 0a4.958 4.958 0 003.135 3.135c1.507.502 1.507 2.634 0 3.136a4.958 4.958 0 00-3.135 3.135c-.502 1.507-2.634 1.507-3.136 0z"
        fill={fill}
      />
    </svg>
  )
}

export default AiStars