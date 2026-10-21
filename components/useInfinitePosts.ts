'use client'

import { useCallback, useState } from 'react'

const POSTS_PER_BATCH = 5

export default function useInfinitePosts<T>(posts: T[], resetKey: string) {
  const [display, setDisplay] = useState({ key: resetKey, count: POSTS_PER_BATCH })
  const visibleCount = display.key === resetKey ? display.count : POSTS_PER_BATCH
  const hasMore = visibleCount < posts.length

  const loadMore = useCallback(() => {
    setDisplay((previous) => ({
      key: resetKey,
      count: Math.min(
        (previous.key === resetKey ? previous.count : POSTS_PER_BATCH) + POSTS_PER_BATCH,
        posts.length
      ),
    }))
  }, [posts.length, resetKey])

  return { displayPosts: posts.slice(0, visibleCount), hasMore, loadMore, visibleCount }
}
