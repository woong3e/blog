import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import getProjects from '@/data/projectsData'
import ProjectLayout from '@/layouts/ProjectLayout'
import { genPageMetadata } from 'app/seo'
import { notFound } from 'next/navigation'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { allProjects } from 'contentlayer/generated'

interface ProjectPageProps {
  params: Promise<{ slug: string[] }>
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjects().find((project) => project.slug === decodeURI(slug.join('/')))

  if (!project) {
    notFound()
  }

  return genPageMetadata({
    title: project.title,
    description: project.summary,
    image: project.images[0],
  })
}

export function generateStaticParams() {
  // Next.js 15 requires a non-empty path list for static export. Draft paths
  // render notFound() below, so their content remains hidden in production.
  return allProjects.map((project) => ({
    slug: project.slug.split('/').map((name) => decodeURI(name)),
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const projects = getProjects()
  const projectIndex = projects.findIndex((project) => project.slug === decodeURI(slug.join('/')))
  const project = projects[projectIndex]

  if (!project) {
    notFound()
  }

  return (
    <ProjectLayout
      content={coreContent(project)}
      prev={projects[projectIndex + 1]}
      next={projects[projectIndex - 1]}
    >
      <MDXLayoutRenderer code={project.body.code} components={components} toc={project.toc} />
    </ProjectLayout>
  )
}
