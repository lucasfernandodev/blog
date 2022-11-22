import * as React from "react"
import { SVGProps } from "react"

interface ComponentProps extends SVGProps<SVGSVGElement>{
  size?: number
}

export const Menu = ({size = 24,...args}: ComponentProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-menu-2"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#000"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...args}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)
