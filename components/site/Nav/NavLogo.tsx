// Global
import Image from 'next/image';
import Link from 'next/link';
import { classnames } from 'tailwindcss-classnames';

const NavLogo = (): JSX.Element => {
  return (
    <Link href="/">
      <a className={classnames('flex', 'items-center', 'mr-auto', 'flex-shrink-0')}>
        <span className={classnames('block', 'relative', 'w-36', 'h-9', 'lg:w-48', 'lg:h-12')}>
          <Image src="/sitecore.svg" layout="fill" alt="Sitecore Logo" />
        </span>
        <span className={classnames('sr-only')}>Sitecore</span>
        <span
          className={classnames(
            'hidden',
            'text-xs',
            'font-semibold',
            'ml-4',
            'text-gray-darkest',
            'xl:block'
          )}
        >
          Developer Portal
        </span>
      </a>
    </Link>
  );
};

export default NavLogo;
