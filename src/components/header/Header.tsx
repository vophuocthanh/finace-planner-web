import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Web3Logo } from '@/components/logo/Web3Logo'
import toastifyCommon from '@/core/helpers/toastify-common'
import { cn } from '@/core/lib/utils'
import { authApi } from '@/core/services/auth.service'
import { clearLS, getAccessTokenFromLS, getRefreshTokenFromLS } from '@/core/shared/storage'
import { useMutation } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, CreditCard, LogOut, Menu, Settings, X, Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const navItems = [
  { title: 'dApps', href: '/' },
  { title: 'DeFi', href: '/' },
  { title: 'NFTs', href: '/' },
  { title: 'Developers', href: '/' }
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
      className={cn('fixed top-0 left-0 z-50 px-4 w-full transition-all duration-300 ease-in-out md:px-8 lg:px-12', {
        'border-b shadow-lg bg-gray-950/90 md:bg-gray-950/80 md:backdrop-blur-md shadow-cyan-500/10 border-cyan-500/20':
          isScrolled,
        'bg-transparent': !isScrolled
      })}
    >
      <div className='flex justify-between items-center py-4 mx-auto max-w-7xl'>
        <div className='relative z-10'>
          <Web3Logo showText={true} size='md' />
        </div>

        <nav className='hidden items-center space-x-8 md:flex'>
          {navItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={item.href}
                className='relative font-medium text-gray-300 transition-colors hover:text-cyan-400 group'
              >
                {item.title}
                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full' />
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className='hidden items-center space-x-6 md:flex'>
          {token ? (
            <Popover>
              <PopoverTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} className='flex gap-2 items-center cursor-pointer'>
                  <div className='w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full' />
                  <span className='text-sm font-medium text-gray-300'>My Wallet</span>
                  <ChevronDown size={16} className='text-gray-400' />
                </motion.div>
              </PopoverTrigger>
              <PopoverContent className='p-0 w-56 bg-gradient-to-br rounded-xl border shadow-xl backdrop-blur-md from-gray-900/95 to-gray-800/95 border-cyan-500/30'>
                <div className='flex flex-col'>
                  <div className='p-3 border-b border-cyan-500/20'>
                    <div className='flex gap-3 items-center'>
                      <div className='flex justify-center items-center w-10 h-10 text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full'>
                        <Wallet size={18} />
                      </div>
                      <div>
                        <p className='text-sm font-medium text-white'>Web3 Wallet</p>
                        <p className='text-xs text-gray-400'>0x1234...5678</p>
                      </div>
                    </div>
                  </div>
                  <div className='py-1'>
                    <Link
                      to='/admin/dashboard'
                      className='flex gap-2 items-center px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-400'
                    >
                      <CreditCard size={16} />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to='/profile'
                      className='flex gap-2 items-center px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-400'
                    >
                      <Settings size={16} />
                      <span>Settings</span>
                    </Link>
                  </div>
                  <div className='border-t border-cyan-500/20'>
                    <button
                      onClick={handleLogout}
                      className='flex gap-2 items-center px-3 py-2 w-full text-sm text-left text-red-400 transition-colors hover:bg-red-500/10'
                    >
                      <LogOut size={16} />
                      <span>Disconnect</span>
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to='/login' className='font-medium text-gray-300 transition-colors hover:text-cyan-400'>
                  Sign In
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to='/register'
                  className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-2.5 rounded-full font-medium transition-all hover:from-cyan-400 hover:to-blue-400 hover:shadow-lg hover:shadow-cyan-500/50'
                >
                  Connect Wallet
                </Link>
              </motion.div>
            </>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
          className='p-2 text-gray-300 rounded-full border backdrop-blur-sm transition-colors md:hidden bg-white/10 border-cyan-500/20 hover:text-cyan-400'
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
            className='overflow-hidden bg-gradient-to-b border-t backdrop-blur-md from-gray-900/95 to-gray-950/95 border-cyan-500/20 md:hidden'
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
                    className='block py-2 font-medium text-gray-300 transition-colors hover:text-cyan-400'
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
                    className='w-full py-2.5 text-center text-gray-300 hover:text-cyan-400 font-medium transition-colors'
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to='/register'
                    className='w-full py-2.5 text-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-medium hover:from-cyan-400 hover:to-blue-400 transition-all'
                    onClick={() => setIsOpen(false)}
                  >
                    Connect Wallet
                  </Link>
                </div>
              ) : (
                <div className='flex flex-col pt-4 space-y-2'>
                  <Link
                    to='/admin/dashboard'
                    className='flex gap-2 items-center py-2 font-medium text-gray-300 transition-colors hover:text-cyan-400'
                    onClick={() => setIsOpen(false)}
                  >
                    <CreditCard size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to='/profile'
                    className='flex gap-2 items-center py-2 font-medium text-gray-300 transition-colors hover:text-cyan-400'
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='flex gap-2 items-center py-2 font-medium text-left text-red-400 transition-colors hover:text-red-300'
                  >
                    <LogOut size={16} />
                    <span>Disconnect</span>
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
