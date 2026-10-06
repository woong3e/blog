'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import Giscus, { type Repo } from '@giscus/react'
import { useTheme } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'

export default function Comments({ slug }: { slug: string }) {
  const { resolvedTheme } = useTheme()

  if (!siteMetadata.comments?.provider) {
    return null
  }

  if (siteMetadata.comments.provider === 'giscus') {
    const config = siteMetadata.comments.giscusConfig

    return (
      <Giscus
        key={slug}
        id="comments-container"
        repo={config.repo as Repo}
        repoId={config.repositoryId}
        category={config.category}
        categoryId={config.categoryId}
        mapping={config.mapping}
        reactionsEnabled={config.reactions}
        emitMetadata={config.metadata}
        inputPosition={config.inputPosition}
        lang={config.lang}
        loading="lazy"
        theme={config.themeURL || (resolvedTheme === 'dark' ? config.darkTheme : config.theme)}
      />
    )
  }

  return <CommentsComponent key={slug} commentsConfig={siteMetadata.comments} slug={slug} />
}
