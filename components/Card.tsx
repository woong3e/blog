import Image from './Image'
import Link from './Link'

interface CardProps {
  title: string
  description?: string
  imgSrc?: string
  href: string
}

export default function Card({ title, description, imgSrc, href }: CardProps) {
  return (
    <Link
      href={href}
      aria-label={`${title} 프로젝트 보기`}
      className="group hover:border-primary-400 focus-visible:outline-primary-500 dark:hover:border-primary-500 flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-[border-color,box-shadow] duration-200 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 dark:border-gray-800 dark:bg-gray-900/40"
    >
      <div className="relative aspect-video w-full overflow-hidden border-b border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
        {imgSrc ? (
          <Image
            alt={`${title} 대표 이미지`}
            src={imgSrc}
            fill
            sizes="(min-width: 1536px) 30vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-center motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
            aria-hidden="true"
          >
            <svg
              className="text-primary-500/40 dark:text-primary-400/40 h-16 w-16"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="7" y="9" width="34" height="30" rx="4" />
              <path d="M7 18h34M14 13.5h.01M19 13.5h.01M18 25l-4 4 4 4M30 25l4 4-4 4" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="group-hover:text-primary-500 dark:group-hover:text-primary-400 text-2xl leading-8 font-bold tracking-tight break-words text-gray-900 transition-colors dark:text-gray-100">
          {title}
        </h2>
        {description && (
          <p className="mt-3 line-clamp-3 text-base leading-7 break-words text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
    </Link>
  )
}
