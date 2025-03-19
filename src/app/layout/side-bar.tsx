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
  const baseClasses = 'flex items-center gap-4 font-medium text-base rounded-xl py-4 transition-all duration-300'
  const collapsedClasses = isCollapsed ? 'justify-center px-0' : 'px-6'
  const activeClasses = isActive ? 'bg-primary text-white' : 'hover:text-primary'

  return (
    <Link to={link.path} className={`${baseClasses} ${collapsedClasses} ${activeClasses}`}>
      <span className={classNames(isActive ? 'svg-animate' : '', 'transition-all duration-300')}>
        {link.icon && React.cloneElement(link.icon, { color: isActive ? '#fff' : '#717171' })}
      </span>
      {!isCollapsed && <span>{link.title}</span>}
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
    <div className={`px-4 py-4 bg-[#FCFCFC] ${sidebarOpen ? 'w-20' : 'w-64'} transition-width duration-300`}>
      <div className='flex items-center gap-2 mb-5'>
        <Logo isCollapsed={sidebarOpen} />
        <button onClick={toggleSidebar} className={`ml-auto ${sidebarOpen ? 'mr-2' : ''}`}>
          {sidebarOpen ? (
            <IconChervonRight className='transition-all duration-300 hover:scale-125' />
          ) : (
            <IconChervonLeft className='transition-all duration-300 hover:scale-125' />
          )}
        </button>
      </div>
      <div>
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
