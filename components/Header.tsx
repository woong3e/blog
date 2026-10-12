'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import TextType from 'components/TextType'
import { usePathname } from 'next/navigation'
import TrueFocus from './TrueFocus'

const Header = () => {
  let headerClass = 'flex w-full items-center justify-between gap-6 bg-white py-10 dark:bg-gray-950'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  const pathname = usePathname()

  return (
    <header className={headerClass}>
      <div
        aria-label={siteMetadata.headerTitle}
        className="hidden h-10 min-w-0 items-center gap-2 sm:flex"
      >
        {typeof siteMetadata.headerTitle === 'string' ? (
          <div className="shrink-0 text-xl leading-7 font-semibold">
            {`${siteMetadata.headerTitle}:`}
          </div>
        ) : (
          siteMetadata.headerTitle
        )}
        <TextType
          text={`~${pathname}`}
          key={pathname}
          deletingSpeed={0}
          loop={false}
          className="text-primary-500 dark:text-primary-400 [text-shadow:0_0_6px_oklch(76.5% 0.177 163.223),0_0_14px_oklch(76.5% 0.177 163.223)] min-w-0 truncate text-xl leading-7 font-medium whitespace-nowrap! dark:[text-shadow:0_0_6px_#000,0_0_16px_#000]"
        />
      </div>
      <div className="ml-auto flex h-10 shrink-0 items-center gap-4 sm:gap-6">
        <div className="no-scrollbar hidden max-w-40 items-center overflow-x-auto px-2 py-1 sm:flex md:max-w-72 lg:max-w-96">
          <TrueFocus
            sentence={headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-primary-500 focus:text-primary-500 active:text-primary-500 dark:hover:text-primary-400 inline-flex h-8 items-center px-1 text-xl leading-7 font-medium text-gray-900 dark:text-gray-100"
              >
                {link.title}
              </Link>
            ))}
            className="w-max flex-nowrap"
            wordClassName="inline-flex shrink-0 items-center"
            manualMode={true}
            blurAmount={0}
            borderColor="oklch(76.5% 0.177 163.223)"
            animationDuration={0.5}
            pauseBetweenAnimations={0.5}
          />
        </div>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
