import * as React from "react"

function IconLinkedin(props: React.SVGProps<SVGSVGElement>) {
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
        d="M5 8v5m0-8v.01M9 13V8m4 5v-3a2 2 0 10-4 0M1 3a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V3z"
        stroke="#AAA"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconLinkedin
