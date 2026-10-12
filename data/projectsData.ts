import { allProjects } from 'contentlayer/generated'
import { sortPosts } from 'pliny/utils/contentlayer'

export default function getProjects() {
  // Like blog posts, drafts can be previewed locally but are hidden in production.
  return sortPosts(
    allProjects.filter((project) => process.env.NODE_ENV !== 'production' || !project.draft)
  )
}
