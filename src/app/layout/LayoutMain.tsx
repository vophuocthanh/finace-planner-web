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
    <div className='flex flex-col h-screen overflow-hidden'>
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />

        <div className='flex-1 relative bg-[#F4F4F4] overflow-auto'>
          <header
            className={classNames(
              'h-16 bg-[#FCFCFC] border-b border-gray-200 fixed top-0 right-0 z-50',
              'transition-all duration-300',
              // Desktop sidebar adjustment
              'md:left-64 md:w-auto',
              sidebarOpen && 'md:left-20',
              // Mobile layout
              'left-0 w-full'
            )}
          >
            <div className='flex items-center justify-end h-full pr-4'>
              <div className='relative' ref={dropdownRef}>
                <Avatar
                  className='w-10 h-10 transition-all cursor-pointer ring-2 ring-primary hover:ring-primary/80'
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <AvatarImage
                    src='https://thuthuatnhanh.com/wp-content/uploads/2022/04/Hinh-nen-Songoku-4K-dep-nhat.jpg'
                    alt='User'
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div
                    className={classNames(
                      'absolute mt-2 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100',
                      'animate-in fade-in-50 slide-in-from-top-5 duration-200',
                      // Desktop positioning
                      'md:right-0 md:w-56',
                      // Mobile positioning
                      'right-0 w-48 max-md:right-0'
                    )}
                  >
                    <button className='flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50'>
                      <LogOut size={16} />
                      <span>Log out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main
            className={classNames(
              'pt-20 px-2 md:px-4 py-4',
              'md:transition-all md:duration-300',
              // Mobile layout
              'ml-0 pb-20 md:pb-4'
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
