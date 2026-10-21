'use client'

import { useEffect, useRef } from 'react'

interface Props {
  onLoadMore: () => void
  visibleCount: number
}

export default function InfiniteScrollTrigger({ onLoadMore, visibleCount }: Props) {
  const trigger = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = trigger.current
    if (!element || !('IntersectionObserver' in window)) return

    let requested = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !requested) {
          requested = true
          observer.disconnect()
          onLoadMore()
        }
      },
      { rootMargin: '240px' }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [onLoadMore, visibleCount])

  return (
    <div ref={trigger} className="flex justify-center py-8">
      <button
        type="button"
        onClick={onLoadMore}
        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 rounded-md px-4 py-2"
      >
        더 보기
      </button>
    </div>
  )
}
