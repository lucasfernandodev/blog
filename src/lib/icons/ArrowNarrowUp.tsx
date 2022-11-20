import * as React from 'react';
import { SVGProps } from 'react';

interface ComponentProps extends SVGProps<SVGSVGElement>{
  size?: number
}

export const ArrowNarrowUp = ({size = 24,...args}: ComponentProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-arrow-narrow-up"
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
    <path d="M12 5v14M16 9l-4-4M8 9l4-4" />
  </svg>
);
