import { ExtraProps } from "react-markdown";

export type ReactMarkdownComponents = Partial<{
  [TagName in keyof JSX.IntrinsicElements]:
    // Class component:
    | (new (props: JSX.IntrinsicElements[TagName] & ExtraProps) => JSX.ElementClass)
    // Function component:
    | ((props: JSX.IntrinsicElements[TagName] & ExtraProps) => JSX.Element | string | null | undefined)
    // Tag name:
    | keyof JSX.IntrinsicElements
}>