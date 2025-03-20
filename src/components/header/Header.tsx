import { logo } from '@/assets/images'
import DropdownHeader from '@/components/header/dropdown-header'
import { checkToken } from '@/core/shared/storage'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

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
        'px-20 p-4 fixed w-full flex items-center justify-between z-50 mb-[88px] transition-all duration-500 ease-in-out',
        {
          'bg-gradient-to-r from-black/40 via-black/30 to-black/20 shadow-lg': isScrolled,
          'bg-transparent shadow-none': !isScrolled
        }
      )}
    >
      <img src={logo} alt='logo' className='transition-opacity duration-300 ease-in-out' />
      <div
        className={classNames(
          'flex justify-center items-center gap-6 px-6 py-4 rounded-lg box-shadow bg-[#FFFFFF] transition-all duration-300 ease-in-out'
        )}
      >
        <Link
          to='/'
          className={classNames('text-[#8987A1] hover:text-[#4E47FF] transition-colors duration-200 ease-in-out')}
        >
          Products
        </Link>
        <Link
          to='/'
          className={classNames('text-[#8987A1] hover:text-[#4E47FF] transition-colors duration-200 ease-in-out')}
        >
          Solutions
        </Link>
        <Link
          to='/'
          className={classNames('text-[#8987A1] hover:text-[#4E47FF] transition-colors duration-200 ease-in-out')}
        >
          Developers
        </Link>
        <Link
          to='/'
          className={classNames('text-[#8987A1] hover:text-[#4E47FF] transition-colors duration-200 ease-in-out')}
        >
          Pricing
        </Link>
      </div>
      <div className='flex items-center gap-10'>
        {checkToken ? (
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
