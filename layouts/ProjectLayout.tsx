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
  const { path, slug, title, toc } = content
  // PDF는 배포할 때 scripts/project-pdfs.mjs 가 만들어 out/static/pdf/projects/ 에 넣는다
  const pdfHref = `${process.env.BASE_PATH || ''}/static/pdf/projects/${slug}.pdf`
  const pdfFileName = `${title.split(' — ')[0]}.pdf`

  return (
    <>
      <ScrollTopAndComment />
      <article className="pl-4 sm:pl-7 xl:pl-15 2xl:pl-21 print:pl-0">
        <header className="space-y-6 border-b border-gray-200 pt-6 pb-10 dark:border-gray-700 print:pt-0 print:pb-6">
          <div className="flex items-center justify-between gap-4 print:hidden">
            <Link
              href="/projects"
              className="hover:text-primary-500 dark:hover:text-primary-400 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors dark:text-gray-400"
            >
              <span aria-hidden="true">&larr;</span>
              프로젝트 목록으로
            </Link>
            <a
              href={pdfHref}
              download={pdfFileName}
              className="hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-400 dark:hover:text-primary-400 inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors dark:border-gray-600 dark:text-gray-300"
            >
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3a1 1 0 0 1 1 1v7.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L9 11.586V4a1 1 0 0 1 1-1ZM4 15a1 1 0 0 1 1 1h10a1 1 0 1 1 2 0 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 1 1 0 0 1 1-1Z" />
              </svg>
              PDF로 받기
            </a>
          </div>
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
                className="grid gap-6 border-t border-gray-200 py-8 sm:grid-cols-2 dark:border-gray-700 print:hidden"
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
                className="border-t border-gray-200 py-8 text-center text-gray-700 dark:border-gray-700 dark:text-gray-300 print:hidden"
                id="comment"
              >
                <Comments slug={path} />
              </div>
            )}
          </div>
          {toc.length > 0 && (
            <aside className="hidden min-w-0 pt-8 xl:block print:hidden" aria-label="프로젝트 목차">
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
