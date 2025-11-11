import Sidebar from '@/app/layout/side-bar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useToggleSideBar from '@/core/store'
import classNames from 'classnames'
import { LogOut } from 'lucide-react'
import { ReactNode, useEffect, useRef, useState } from 'react'

interface ILayoutMainProps {
  children: ReactNode
}

const LayoutMain = ({ children }: ILayoutMainProps) => {
  const { sidebarOpen } = useToggleSideBar()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  return (
    <div className='flex overflow-hidden flex-col h-screen'>
      <div className='flex overflow-hidden flex-1'>
        <Sidebar />

        <div className='overflow-auto relative flex-1 bg-gradient-to-br from-gray-950 via-indigo-950/30 to-gray-950'>
          <header
            className={classNames(
              'fixed top-0 z-50 bg-gradient-to-r border-b backdrop-blur-md h-[66px] from-gray-900/95 to-gray-800/95 border-cyan-500/20',
              'shadow-lg transition-all duration-300 shadow-cyan-500/10',
              // Desktop sidebar adjustment - always start from sidebar edge and extend to right edge
              sidebarOpen ? 'md:left-20 md:right-0' : 'md:left-64 md:right-0',
              // Mobile layout
              'right-0 left-0'
            )}
          >
            <div className='flex justify-end items-center pr-4 h-full'>
              <div className='relative' ref={dropdownRef}>
                <Avatar
                  className='w-10 h-10 border ring-2 transition-all cursor-pointer ring-cyan-500/50 hover:ring-cyan-400 border-cyan-500/30'
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <AvatarImage
                    src='https://thuthuatnhanh.com/wp-content/uploads/2022/04/Hinh-nen-Songoku-4K-dep-nhat.jpg'
                    alt='User'
                  />
                  <AvatarFallback className='font-semibold text-white bg-gradient-to-br from-cyan-500 to-blue-500'>
                    CN
                  </AvatarFallback>
                </Avatar>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div
                    className={classNames(
                      'absolute z-10 py-1 mt-2 bg-gradient-to-br rounded-xl border shadow-xl backdrop-blur-md from-gray-900/95 to-gray-800/95 border-cyan-500/30 shadow-cyan-500/20',
                      'duration-200 animate-in fade-in-50 slide-in-from-top-5',
                      // Desktop positioning
                      'md:right-0 md:w-56',
                      // Mobile positioning
                      'right-0 w-48 max-md:right-0'
                    )}
                  >
                    <button className='flex gap-2 items-center px-4 py-2 mx-1 w-full text-sm text-left text-red-400 rounded-lg transition-colors hover:bg-red-500/10'>
                      <LogOut size={16} />
                      <span>Disconnect</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main
            className={classNames(
              'px-2 py-4 pt-20 md:px-4',
              'md:transition-all md:duration-300',
              // Mobile layout
              'pb-20 ml-0 md:pb-4'
            )}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default LayoutMain
