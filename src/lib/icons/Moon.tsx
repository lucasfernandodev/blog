import * as React from 'react';
import { SVGProps } from 'react';

interface ComponentProps extends SVGProps<SVGSVGElement>{
  size?: number
}

export const Moon = ({size = 24,...args}: ComponentProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-moon"
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
    <path d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z" />
  </svg>
);