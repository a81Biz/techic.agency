// src/types/mdx.d.ts
import type { MDXMeta } from '../models/mdx.model'
import type { ComponentType } from 'react'

declare module '*.mdx' {
  export const meta: MDXMeta
  const Component: ComponentType<Record<string, unknown>>
  export default Component
}
