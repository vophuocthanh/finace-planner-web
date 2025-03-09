import { logo } from '@/assets/images'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='px-20 p-4 fixed w-full flex items-center justify-between z-50 mb-[88px]'>
      <img src={logo} alt='' />
      <div className='flex justify-center items-center gap-6 px-6 py-4 rounded-lg box-shadow bg-[#FFFFFF]'>
        <Link to='/' className='text-[#8987A1]'>
          Products
        </Link>
        <Link to='/' className='text-[#8987A1]'>
          Solutions
        </Link>
        <Link to='/' className='text-[#8987A1]'>
          Developers
        </Link>
        <Link to='/' className='text-[#8987A1]'>
          Pricing
        </Link>
      </div>
      <div className='flex items-center gap-10'>
        <Link to='/login' className='text-[#8987A1]'>
          Sign In
        </Link>
        <Link to='/register' className='bg-[#4E47FF] text-white px-4 py-2 rounded-lg'>
          Sign Up
        </Link>
      </div>
    </header>
  )
}
