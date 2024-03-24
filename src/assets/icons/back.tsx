import * as React from "react"

function IconBack(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={11}
      height={10}
      viewBox="0 0 11 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.167.833L1 5l4.167 4.167m5-8.334L6 5l4.167 4.167"
        stroke="#D44D4D"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconBack
