import { logo } from '@/assets/images'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import toastifyCommon from '@/core/helpers/toastify-common'
import { cn } from '@/core/lib/utils'
import { authApi } from '@/core/services/auth.service'
import { clearLS, getAccessTokenFromLS, getRefreshTokenFromLS } from '@/core/shared/storage'
import { useMutation } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, CreditCard, LogOut, Menu, Settings, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const navItems = [
  { title: 'Products', href: '/' },
  { title: 'Solutions', href: '/' },
  { title: 'Developers', href: '/' },
  { title: 'Pricing', href: '/' }
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const token = getAccessTokenFromLS()
  const { mutate: logout } = useMutation({
    mutationFn: () => authApi.logout(getRefreshTokenFromLS()),
    onSuccess: () => {
      toastifyCommon.success('Logout successfully')
      clearLS()
    }
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleLogout = () => {
    logout()
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn('fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-4 md:px-8 lg:px-12', {
        'bg-white md:bg-white/90 md:backdrop-blur-md shadow-md': isScrolled,
        'bg-transparent': !isScrolled
      })}
    >
      <div className='flex items-center justify-between py-4 mx-auto max-w-7xl'>
        <Link to='/' className='relative z-10'>
          <motion.img src={logo} alt='Finance Planner' whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} />
        </Link>

        <nav className='items-center hidden space-x-8 md:flex'>
          {navItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link to={item.href} className='text-[#8987A1] hover:text-primary font-medium relative group'>
                {item.title}
                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full' />
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className='items-center hidden space-x-6 md:flex'>
          {token ? (
            <Popover>
              <PopoverTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} className='flex items-center gap-2 cursor-pointer'>
                  <div className='w-8 h-8 rounded-full bg-gradient-to-r from-primary to-indigo-400' />
                  <span className='text-sm font-medium text-[#8987A1]'>My Account</span>
                  <ChevronDown size={16} />
                </motion.div>
              </PopoverTrigger>
              <PopoverContent className='w-56 p-0 shadow-xl bg-white/90 backdrop-blur-md rounded-xl'>
                <div className='flex flex-col'>
                  <div className='p-3 border-b border-gray-100'>
                    <div className='flex items-center gap-3'>
                      <div className='flex items-center justify-center w-10 h-10 text-white rounded-full bg-gradient-to-r from-primary to-indigo-400'>
                        <User size={18} />
                      </div>
                      <div>
                        <p className='text-sm font-medium'>User Account</p>
                        <p className='text-xs text-gray-500'>user@example.com</p>
                      </div>
                    </div>
                  </div>
                  <div className='py-1'>
                    <Link
                      to='/admin/dashboard'
                      className='flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    >
                      <CreditCard size={16} />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to='/profile'
                      className='flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    >
                      <Settings size={16} />
                      <span>Settings</span>
                    </Link>
                  </div>
                  <div className='border-t border-gray-100'>
                    <button
                      onClick={handleLogout}
                      className='flex items-center w-full gap-2 px-3 py-2 text-sm text-left text-red-600 hover:bg-red-50'
                    >
                      <LogOut size={16} />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to='/login' className='text-[#8987A1] hover:text-primary font-medium'>
                  Sign In
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to='/register'
                  className='bg-primary text-white px-5 py-2.5 rounded-full font-medium transition-all'
                >
                  Sign Up
                </Link>
              </motion.div>
            </>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
          className='p-2 rounded-full md:hidden bg-white/10 backdrop-blur-sm'
          aria-label='Toggle menu'
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='overflow-hidden bg-white md:hidden'
          >
            <div className='px-6 py-4 space-y-4'>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className='block py-2 text-[#8987A1] hover:text-primary font-medium'
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                </motion.div>
              ))}

              {!token ? (
                <div className='flex flex-col pt-4 space-y-3'>
                  <Link
                    to='/login'
                    className='w-full py-2.5 text-center text-[#8987A1] hover:text-primary font-medium'
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to='/register'
                    className='w-full py-2.5 text-center bg-primary text-white rounded-full font-medium'
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className='flex flex-col pt-4 space-y-2'>
                  <Link
                    to='/admin/dashboard'
                    className='flex items-center gap-2 py-2 text-[#8987A1] hover:text-primary font-medium'
                    onClick={() => setIsOpen(false)}
                  >
                    <CreditCard size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to='/profile'
                    className='flex items-center gap-2 py-2 text-[#8987A1] hover:text-primary font-medium'
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='flex items-center gap-2 py-2 font-medium text-left text-red-500'
                  >
                    <LogOut size={16} />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
