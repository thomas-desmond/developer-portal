// Global
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import FocusTrap from 'focus-trap-react';
import { useId } from 'react-id-generator';
import { classnames } from 'tailwindcss-classnames';
// Data
import { NavigationData } from '@/data/data-navigation';
// Components
import SvgIcon, { IconNames } from '@/components/helper/SvgIcon';
import DynamicTag from '@/components/helper/DynamicTag';
import ConditionalWrapper from '@/components/helper/ConditionalWrapper';
// Local
import NavLink from '@/components/site/Nav/NavLink';

type NavMenuProps = NavigationData & {
  buttonIcon?: IconNames;
  callback?: () => void;
};

/*
 * The menus themselves.
 */
const NavMenu = ({ title, url, children, buttonIcon, callback }: NavMenuProps): JSX.Element => {
  /**
   *  React hook for unique IDs using react-unique-id.
   *  Avoid generating new ID on every rerender.
   */
  const [idSeed] = useId(1, 'scdp-nav-menu');
  const navMenuId = idSeed;
  const navMenuToggleId = `${idSeed}--toggle`;
  const navMenuOverlayId = `${idSeed}--overlay`;
  const navMenuCloseId = `${idSeed}--close`;
  /**
   *  React hooks for handling open/close states.
   */
  const navItemRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  // Toggle the parent nav's callback and open state.
  const toggleNavItem = (event: React.MouseEvent) => {
    if (callback && (event?.target as HTMLButtonElement)?.localName !== 'button') {
      callback();
    }
    setOpen(!isOpen);
  };
  // Close on click outside of menu.
  useEffect(() => {
    const pageClickEvent = (event: Event) => {
      if (navItemRef.current !== null && !navItemRef?.current?.contains(event.target as Node)) {
        setOpen(!isOpen);
      }
    };

    if (isOpen) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isOpen]);

  const mainNavItemStyles = classnames(
    'nav-item--button',
    'flex',
    'items-center',
    'font-semibold',
    'text-left',
    'relative',
    'pr-8',
    'h-14',
    'w-full',
    'group',
    'whitespace-nowrap',
    'transform-gpu',
    'transition-colors',
    'hover:text-teal',
    'lg:h-16',
    'lg:pr-0'
  );
  const buttonActiveClasses = classnames('text-teal', 'visible', 'nav-item--button-active');
  const navItemOverlayInactiveClasses = classnames(
    'translate-x-full',
    'lg:translate-none',
    'lg:hidden',
    'invisible'
  );
  const navItemOverlayActiveClasses = classnames('translate-x-0', 'shadow-inner');

  return (
    <ConditionalWrapper
      condition={!!children}
      wrapper={(children) => (
        <FocusTrap
          active={isOpen}
          focusTrapOptions={{
            clickOutsideDeactivates: false,
            onDeactivate: () => setOpen(false),
            allowOutsideClick: true,
            initialFocus: children ? `#${navMenuCloseId}` : false,
          }}
        >
          {children}
        </FocusTrap>
      )}
    >
      <div id={navMenuId}>
        {/* 
          Main Nav Item
        */}
        <ConditionalWrapper
          condition={!!url}
          wrapper={(children) => (
            <Link href={url as string} passHref>
              {children}
            </Link>
          )}
        >
          <DynamicTag
            tag={children ? 'button' : 'a'}
            id={navMenuToggleId}
            className={classnames(mainNavItemStyles, {
              [buttonActiveClasses]: children && isOpen,
              ['lg:pr-5']: !!children,
            })}
            aria-haspopup={children ? true : undefined}
            tabIndex={children ? (isOpen ? -1 : undefined) : undefined}
            aria-controls={children ? navMenuOverlayId : undefined}
            onClick={toggleNavItem}
          >
            <span className={classnames('inline-flex', 'items-center', 'pointer-events-none')}>
              {buttonIcon && (
                <SvgIcon icon={buttonIcon} className={classnames('w-em', 'h-em', 'mr-em')} />
              )}
              {title}
            </span>
            {children && (
              <>
                <span
                  className={classnames(
                    'absolute',
                    'top-5',
                    'right-0',
                    'block',
                    'h-em',
                    'w-em',
                    'lg:hidden'
                  )}
                >
                  <SvgIcon
                    icon="chevron-right"
                    className={classnames(
                      'h-inherit',
                      'w-inherit',
                      'top-5',
                      'transition-transform',
                      'transform-gpu',
                      'group-hover:translate-x-1'
                    )}
                  />
                </span>
                <span
                  className={classnames(
                    'absolute',
                    'top-1/2',
                    '-mt-1.5',
                    'right-0',
                    'block',
                    'h-3',
                    'w-3',
                    'hidden',
                    'lg:block'
                  )}
                >
                  <SvgIcon
                    icon="chevron-down"
                    className={classnames(
                      'h-inherit',
                      'w-inherit',
                      'top-5',
                      'transition-transform',
                      'transform-gpu',
                      {
                        ['rotate-180']: isOpen,
                      }
                    )}
                  />
                </span>
              </>
            )}
          </DynamicTag>
        </ConditionalWrapper>
        {/* 
          Nav Item Overlay
        */}
        {children && (
          <div
            ref={navItemRef}
            id={navMenuOverlayId}
            aria-hidden={isOpen}
            aria-label={`${title} submenu`}
            className={classnames(
              'fixed',
              'top-32',
              'bottom-0',
              'inset-x-0',
              'bg-white',
              'border-b',
              'border-gray-lightest',
              'z-50',
              'transform-gpu',
              'overflow-y-auto',
              'transition-transform',
              'lg:top-16',
              'lg:absolute',
              'lg:bottom-auto',
              'lg:shadow-lg',
              'lg:transform-none',
              'lg:transition-none',
              {
                [navItemOverlayInactiveClasses]: !isOpen,
                [navItemOverlayActiveClasses]: isOpen,
              }
            )}
          >
            {/* 
              Back Button
            */}
            <button
              id={navMenuCloseId}
              className={classnames(
                'font-semibold',
                'text-left',
                'relative',
                'pr-4',
                'pl-10',
                'h-14',
                'block',
                'w-full',
                'group',
                'bg-teal',
                'text-white',
                // 'lg:hidden',
                'transform-gpu',
                'transition-colors',
                'hover:bg-teal-dark',
                'focus-ring-inset',
                'lg:max-w-screen-lg',
                'mx-auto',
                'lg:opacity-0',
                'lg:max-h-0',
                'focus:opacity-100',
                'lg:focus-visible:max-h-full'
              )}
              onClick={toggleNavItem}
            >
              <span className={classnames('lg:sr-only')}>Back</span>
              <span className={classnames('sr-only', 'lg:not-sr-only')}>Close submenu</span>
              <span
                className={classnames(
                  'absolute',
                  'top-5',
                  'left-4',
                  'block',
                  'h-em',
                  'w-em',
                  'pointer-events-none'
                )}
              >
                <SvgIcon
                  icon="chevron-left"
                  className={classnames(
                    'h-inherit',
                    'w-inherit',
                    'top-5',
                    'transition-transform',
                    'transform-gpu',
                    'group-hover:-translate-x-1',
                    'lg:rotate-90'
                  )}
                />
              </span>
            </button>
            {/* 
              Nav Item Links
            */}
            <div className={classnames('px-gutter')}>
              <div className={classnames('max-w-screen-lg', 'mx-auto', 'pt-6', 'lg:py-12')}>
                <ul
                  className={classnames(
                    'grid',
                    'gap-6',
                    'md:gap-8',
                    'md:grid-cols-2',
                    'lg:grid-cols-3'
                  )}
                >
                  {children?.map((child, index) => (
                    <li
                      key={`child-${index}`}
                      className={classnames('border-b', 'border-gray-light', 'pb-4', 'md:pb-6')}
                    >
                      <NavLink
                        text={child.title}
                        url={child.url}
                        level={1}
                        onClick={toggleNavItem}
                      />
                      {child.children && (
                        <ul>
                          {child.children?.map((child, index) => (
                            <li key={`child-${index}`} className={classnames('mb-4', 'lg:mb-2')}>
                              <NavLink text={child.title} url={child.url} onClick={toggleNavItem} />
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </ConditionalWrapper>
  );
};

export default NavMenu;
