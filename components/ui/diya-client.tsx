'use client'

import dynamic from 'next/dynamic'

const DiyaScene = dynamic(
  () => import('./diya-scene').then((m) => ({ default: m.DiyaScene })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loader" />
      </div>
    ),
  }
)

export function DiyaClient({ className }: { className?: string }) {
  return <DiyaScene className={className} />
}
