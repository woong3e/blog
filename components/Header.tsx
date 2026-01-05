'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import TextType from 'components/TextType'
import { usePathname } from 'next/navigation'
import TrueFocus from './TrueFocus'

const Header = () => {
  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  const pathname = usePathname()

  return (
    <header className={headerClass}>
      <div aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden h-6 text-xl font-semibold sm:block">
              {`${siteMetadata.headerTitle}:`}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
          <TextType
            text={`∼${pathname}`}
            key={pathname}
            deletingSpeed={0}
            loop={false}
            className="text-primary-500 dark:text-primary-400 [text-shadow:0_0_6px_oklch(76.5% 0.177 163.223),0_0_14px_oklch(76.5% 0.177 163.223)] hidden h-6 items-center indent-2 text-xl font-medium sm:block dark:[text-shadow:0_0_6px_#000,0_0_16px_#000]"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar mb-2 hidden max-w-40 items-center gap-x-4 overflow-x-auto px-2 py-2 sm:flex md:max-w-72 lg:max-w-96">
          <TrueFocus
            sentence={headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-primary-500 dark:hover:text-primary-400 text-xl font-medium text-gray-900 dark:text-gray-100"
              >
                {link.title}
              </Link>
            ))}
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
