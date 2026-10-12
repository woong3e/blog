import type { ReactNode } from 'react'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Project } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import TOCInline from '@/components/TOCInline'
import siteMetadata from '@/data/siteMetadata'

interface LayoutProps {
  content: CoreContent<Project>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function ProjectLayout({ content, next, prev, children }: LayoutProps) {
  const { path, title, toc } = content

  return (
    <>
      <ScrollTopAndComment />
      <article className="pl-4 sm:pl-7 xl:pl-15 2xl:pl-21">
        <header className="space-y-6 border-b border-gray-200 pt-6 pb-10 dark:border-gray-700">
          <Link
            href="/projects"
            className="hover:text-primary-500 dark:hover:text-primary-400 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors dark:text-gray-400"
          >
            <span aria-hidden="true">&larr;</span>
            프로젝트 목록으로
          </Link>
          <PageTitle>{title}</PageTitle>
        </header>
        <div
          className={`pb-8 ${toc.length > 0 ? 'xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)] xl:gap-12' : ''}`}
        >
          <div className="min-w-0">
            <div className="prose dark:prose-invert max-w-none pt-8 pb-12">{children}</div>
            {(prev || next) && (
              <nav
                aria-label="프로젝트 이동"
                className="grid gap-6 border-t border-gray-200 py-8 sm:grid-cols-2 dark:border-gray-700"
              >
                {prev && (
                  <Link href={`/${prev.path}`} className="group space-y-2 sm:col-start-1">
                    <span className="block text-sm text-gray-500 dark:text-gray-400">
                      &larr; 이전 프로젝트
                    </span>
                    <span className="group-hover:text-primary-500 dark:group-hover:text-primary-400 block font-medium text-gray-900 dark:text-gray-100">
                      {prev.title}
                    </span>
                  </Link>
                )}
                {next && (
                  <Link
                    href={`/${next.path}`}
                    className="group space-y-2 sm:col-start-2 sm:text-right"
                  >
                    <span className="block text-sm text-gray-500 dark:text-gray-400">
                      다음 프로젝트 &rarr;
                    </span>
                    <span className="group-hover:text-primary-500 dark:group-hover:text-primary-400 block font-medium text-gray-900 dark:text-gray-100">
                      {next.title}
                    </span>
                  </Link>
                )}
              </nav>
            )}
            {siteMetadata.comments && (
              <div
                className="border-t border-gray-200 py-8 text-center text-gray-700 dark:border-gray-700 dark:text-gray-300"
                id="comment"
              >
                <Comments slug={path} />
              </div>
            )}
          </div>
          {toc.length > 0 && (
            <aside className="hidden min-w-0 pt-8 xl:block" aria-label="프로젝트 목차">
              <nav className="sticky top-8 border-l border-gray-200 pl-6 dark:border-gray-700">
                <h2 className="mb-5 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  목차
                </h2>
                <div className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                  <TOCInline toc={toc} asDisclosure={false} />
                </div>
              </nav>
            </aside>
          )}
        </div>
      </article>
    </>
  )
}
