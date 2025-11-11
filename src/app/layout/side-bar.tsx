import { Web3Logo } from '@/components/logo/Web3Logo'
import { sidebarLinks } from '@/core/constants/general.const'
import useToggleSideBar from '@/core/store'
import { TSidebarLinks } from '@/models/types/general.type'
import classNames from 'classnames'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
        'flex relative gap-4 items-center py-4 w-24 text-base font-medium rounded-xl transition-all duration-300 group md:w-full',
        { 'justify-center px-0 w-full': isCollapsed, 'px-6 w-24': !isCollapsed },
        {
          'text-cyan-400 bg-gradient-to-r border-l-4 border-cyan-400 from-cyan-500/20 to-blue-500/20': isActive,
          'text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50': !isActive
        },
        'md:flex-row md:gap-4',
        'flex-col gap-1 justify-center px-0'
      )}
    >
      <span
        className={classNames('transition-all duration-300', {
          'text-cyan-400': isActive,
          'text-gray-400 group-hover:text-cyan-400': !isActive
        })}
      >
        {link.icon &&
          React.cloneElement(link.icon, {
            color: isActive ? '#22d3ee' : 'currentColor'
          })}
      </span>
      {!isCollapsed && (
        <span
          className={classNames('hidden transition-colors md:inline', {
            'font-semibold text-cyan-400': isActive,
            'text-gray-400 group-hover:text-cyan-400': !isActive
          })}
        >
          {link.title}
        </span>
      )}
      {/* Glow effect on active */}
      {isActive && (
        <div className='absolute inset-0 bg-gradient-to-r rounded-xl blur-sm from-cyan-500/10 to-blue-500/10 -z-10' />
      )}
    </Link>
  )
}

const Logo = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-4 ml-4'}`}>
    <Web3Logo showText={!isCollapsed} size={isCollapsed ? 'sm' : 'md'} />
  </div>
)

const Sidebar = () => {
  const { pathname } = useLocation()
  const { sidebarOpen, toggleSidebar } = useToggleSideBar()

  return (
    <div
      className={classNames(
        'px-4 py-4 bg-gradient-to-b from-gray-900 border-r to-gray-950 border-cyan-500/20',
        // Desktop styles
        sidebarOpen ? 'md:w-20' : 'md:w-64',
        'md:h-full md:flex md:flex-col md:static',
        'duration-300 transition-width',
        // Mobile styles
        'flex fixed right-0 bottom-0 left-0 z-50 w-full h-20 border-t backdrop-blur-md border-cyan-500/20'
      )}
    >
      <div className={classNames('flex gap-2 items-center pb-4 mb-5 border-b border-cyan-500/20', 'hidden md:flex')}>
        <Logo isCollapsed={sidebarOpen} />
        <button
          onClick={toggleSidebar}
          className={`ml-auto p-1.5 rounded-lg transition-all duration-300 text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50 ${sidebarOpen ? 'mr-2' : ''}`}
        >
          {sidebarOpen ? (
            <ChevronRight size={20} className='transition-all duration-300 hover:scale-125' />
          ) : (
            <ChevronLeft size={20} className='transition-all duration-300 hover:scale-125' />
          )}
        </button>
      </div>
      <div className={classNames('flex gap-2 md:flex-col', 'justify-around w-full md:justify-start')}>
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
