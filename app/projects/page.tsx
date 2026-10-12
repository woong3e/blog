import getProjects from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  const projects = getProjects()

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            직접 기획하고 개발한 프로젝트를 소개합니다.
          </p>
        </div>
        <div className="py-12">
          {projects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:gap-8 2xl:grid-cols-3">
              {projects.map((project) => (
                <Card
                  key={project.slug}
                  title={project.title}
                  description={project.summary || ''}
                  imgSrc={project.images[0]}
                  href={`/${project.path}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">프로젝트를 준비하고 있습니다.</p>
          )}
        </div>
      </div>
    </>
  )
}
