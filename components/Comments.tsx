'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { useTheme } from 'next-themes'

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false)
  const { resolvedTheme } = useTheme()

  if (!siteMetadata.comments?.provider) {
    return null
  }

  const commentsConfig =
    siteMetadata.comments?.provider === 'giscus'
      ? {
          ...siteMetadata.comments,
          giscusConfig: {
            ...siteMetadata.comments.giscusConfig,
            theme:
              resolvedTheme === 'dark'
                ? siteMetadata.comments.giscusConfig.darkTheme
                : siteMetadata.comments.giscusConfig.theme,
          },
        }
      : siteMetadata.comments

  return (
    <>
      {loadComments ? (
        <CommentsComponent commentsConfig={commentsConfig} slug={slug} />
      ) : (
        <button onClick={() => setLoadComments(true)}>Load Comments</button>
      )}
    </>
  )
}
