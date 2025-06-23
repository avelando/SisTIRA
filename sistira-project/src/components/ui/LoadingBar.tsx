'use client'

import React from 'react'

interface LoadingBarProps {
  loading: boolean
}

export default function LoadingBar({ loading }: LoadingBarProps) {
  if (!loading) return null

  return (
    <>
      <div
        className={`
          fixed top-0 left-0
          h-[3px] w-full
          bg-[#0070f3]
          z-[9999]
          animate-loading
        `}
      />
      <style jsx global>{`
        @keyframes loading {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading {
          animation: loading 1s ease-out infinite;
        }
      `}</style>
    </>
  )
}
