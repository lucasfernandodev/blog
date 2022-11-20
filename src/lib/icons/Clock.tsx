import * as React from "react"
import { SVGProps } from "react"

interface ComponentProps extends SVGProps<SVGSVGElement>{
  size?: number
}

export const Clock = ({size = 24,...args}: ComponentProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...args}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <circle cx={12} cy={12} r={9} />
    <path d="M12 7v5l3 3" />
  </svg>
)
