import { IconChervonLeft, IconChervonRight } from '@/assets/icons'
import { logo } from '@/assets/images'
import { sidebarLinks } from '@/core/constants/general.const'
import { path } from '@/core/constants/path'
import useToggleSideBar from '@/core/store'
import { TSidebarLinks } from '@/models/types/general.type'
import classNames from 'classnames'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface ISidebarLinkProps {
  link: TSidebarLinks
  isActive: boolean
  isCollapsed: boolean
}

const SidebarLink = ({ link, isActive, isCollapsed }: ISidebarLinkProps) => {
  return (
    <Link
      to={link.path}
      className={classNames(
        'flex items-center gap-4 font-medium text-base rounded-xl py-4 transition-all duration-300 group',
        { 'justify-center px-0': isCollapsed, 'px-6': !isCollapsed },
        { 'bg-primary text-white': isActive, 'hover:text-primary': !isActive },
        'md:flex-row md:gap-4',
        'flex-col gap-1 px-0 justify-center'
      )}
    >
      <span className={classNames('transition-all duration-300 group-hover:text-primary', { 'svg-animate': isActive })}>
        {link.icon &&
          React.cloneElement(link.icon, {
            color: isActive ? '#fff' : 'currentColor'
          })}
      </span>
      {!isCollapsed && <span className='hidden md:inline'>{link.title}</span>}
    </Link>
  )
}

const Logo = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <Link to={path.home} className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-4 ml-10'}`}>
    {!isCollapsed && <img src={logo} alt='logo' />}
  </Link>
)

const Sidebar = () => {
  const { pathname } = useLocation()
  const { sidebarOpen, toggleSidebar } = useToggleSideBar()

  return (
    <div
      className={classNames(
        'px-4 py-4 bg-[#FCFCFC]',
        // Desktop styles
        sidebarOpen ? 'md:w-20' : 'md:w-64',
        'md:h-full md:flex md:flex-col md:static',
        'transition-width duration-300',
        // Mobile styles
        'fixed bottom-0 left-0 right-0 h-20 flex w-full z-50'
      )}
    >
      <div className={classNames('flex items-center gap-2 mb-5', 'hidden md:flex')}>
        <Logo isCollapsed={sidebarOpen} />
        <button onClick={toggleSidebar} className={`ml-auto ${sidebarOpen ? 'mr-2' : ''}`}>
          {sidebarOpen ? (
            <IconChervonRight className='transition-all duration-300 hover:scale-125' />
          ) : (
            <IconChervonLeft className='transition-all duration-300 hover:scale-125' />
          )}
        </button>
      </div>
      <div className={classNames('flex md:flex-col', 'justify-around md:justify-start w-full')}>
        {sidebarLinks.map((link) => (
          <SidebarLink
            key={link.title}
            link={link}
            isActive={pathname.startsWith(link.path)}
            isCollapsed={sidebarOpen}
          />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
