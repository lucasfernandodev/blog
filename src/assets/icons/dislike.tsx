import * as React from "react"

function IconDislike(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={19}
      height={18}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 10V2a1 1 0 00-1-1H2a1 1 0 00-1 1v7a1 1 0 001 1h3zm0 0a4 4 0 014 4v1a2 2 0 004 0v-5h3a2 2 0 002-2l-1-5c-.144-.613-.417-1.14-.777-1.501-.361-.36-.79-.536-1.223-.499H8a3 3 0 00-3 3"
        stroke="#F17694"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconDislike
