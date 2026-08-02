'use client'

import dynamic from 'next/dynamic'

const CustomCursorDynamic = dynamic(() => import('@/components/layout/CustomCursor'), { ssr: false })

export default function CustomCursorWrapper() {
  return <CustomCursorDynamic />
}
