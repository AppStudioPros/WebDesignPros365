'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-error mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Something went wrong</h2>
        <p className="text-white/60 mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <Button onClick={reset} variant="accent">
          Try Again
        </Button>
      </div>
    </div>
  )
}
