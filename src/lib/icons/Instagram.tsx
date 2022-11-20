import * as React from "react"
import { SVGProps } from "react"

interface ComponentProps extends SVGProps<SVGSVGElement>{
  size?: number
}

export const Instagram = ({size = 24,...args}: ComponentProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-brand-instagram"
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
    <rect x={4} y={4} width={16} height={16} rx={4} />
    <circle cx={12} cy={12} r={3} />
    <path d="M16.5 7.5v.001" />
  </svg>
)
