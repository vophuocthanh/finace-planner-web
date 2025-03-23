import { logo } from '@/assets/images'
import DropdownHeader from '@/components/header/dropdown-header'
import { getAccessTokenFromLS } from '@/core/shared/storage'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  const token = getAccessTokenFromLS()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={classNames(
        'fixed top-0 left-0 w-full flex items-center justify-between z-50 p-4 lg:px-20 transition-all duration-500 ease-in-out ',
        {
          'bg-gradient-to-r from-black/40 via-black/30 to-black/20 shadow-lg': isScrolled,
          'bg-transparent shadow-none': !isScrolled
        }
      )}
    >
      <div className='hidden md:block'>
        <img src={logo} alt='logo' className='transition-opacity duration-300 ease-in-out ' />
      </div>
      <Navbar />
      <div className='flex items-center gap-10 max-lg:ml-[6rem]'>
        {token ? (
          <DropdownHeader />
        ) : (
          <>
            <Link
              to='/login'
              className={classNames('text-[#8987A1] hover:text-[#4E47FF] transition-colors duration-200 ease-in-out')}
            >
              Sign In
            </Link>
            <Link
              to='/register'
              className={classNames(
                'bg-[#4E47FF] text-white px-4 py-2 rounded-lg',
                'hover:bg-[#3e37cc] transition-all duration-300 ease-in-out transform hover:scale-105'
              )}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
