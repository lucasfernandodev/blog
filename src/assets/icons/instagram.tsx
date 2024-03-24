import * as React from "react"

function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.5 4.5v.01M1 5a4 4 0 014-4h8a4 4 0 014 4v8a4 4 0 01-4 4H5a4 4 0 01-4-4V5zm5 4a3 3 0 106 0 3 3 0 00-6 0z"
        stroke="#AAA"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconInstagram
