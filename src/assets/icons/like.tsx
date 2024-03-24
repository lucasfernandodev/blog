import * as React from "react"

function IconLike(props: React.SVGProps<SVGSVGElement>) {
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
        d="M5 8v8a1 1 0 01-1 1H2a1 1 0 01-1-1V9a1 1 0 011-1h3zm0 0a4 4 0 004-4V3a2 2 0 114 0v5h3a2 2 0 012 2l-1 5c-.144.614-.417 1.14-.777 1.501-.361.36-.79.536-1.223.499H8a3 3 0 01-3-3"
        stroke="#5CDF9D"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconLike
