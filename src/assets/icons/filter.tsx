import * as React from "react"

function IconFilter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={18}
      height={19}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 1h16v2.172a2 2 0 01-.586 1.414L12 9v7l-6 2V9.5L1.52 4.572A2 2 0 011 3.227V1z"
        stroke="#CCC"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconFilter
