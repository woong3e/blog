export type Toc = {
  value: string
  depth: number
  url: string
}[]

export interface TOCInlineProps {
  toc: Toc
  fromHeading?: number
  toHeading?: number
  asDisclosure?: boolean
  exclude?: string | string[]
  collapse?: boolean
  rightAlign?: boolean
}

/**
 * Generates an inline table of contents
 * Exclude titles matching this string (new RegExp('^(' + string + ')$', 'i')).
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 *
 * @param {TOCInlineProps} {
 *   toc,
 *   fromHeading = 1,
 *   toHeading = 6,
 *   asDisclosure = false,
 *   exclude = '',
 *   collapse = false,
 *   rightAlign = false,
 * }
 *
 */
const TOCInline = ({
  toc,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = false,
  exclude = '',
  collapse = false,
  rightAlign = false,
}: TOCInlineProps) => {
  const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i')

  const filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  )

  const tocList = (
    <ul className="space-y-2">
      {filteredToc.map((heading) => (
        <li
          key={heading.value}
          className={`${
            heading.depth === 2
              ? 'ml-3'
              : heading.depth === 3
                ? 'ml-6'
                : heading.depth >= 4
                  ? 'ml-9'
                  : ''
          }`}
        >
          <a
            href={heading.url}
            className={`hover:text-primary-500 dark:hover:text-primary-400 block ${
              heading.depth === 2 ? 'font-medium' : ''
            }`}
          >
            {heading.value}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      {asDisclosure ? (
        <details open={!collapse}>
          <summary className="ml-6 pt-2 pb-2 text-xl font-bold">Table of Contents</summary>
          <div className="ml-6">{tocList}</div>
        </details>
      ) : (
        tocList
      )}
    </>
  )
}

export default TOCInline
