import { logo } from '@/assets/images'
import { path } from '@/core/constants/path'
import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
}

const Logo = ({ className = '' }: LogoProps) => {
  return (
    <Link to={path.home} className={`flex items-center gap-4 ml-10 ${className}`}>
      <img src={logo} alt='logo' className='w-24 h-10' />
    </Link>
  )
}

const TopBar = () => {
  return (
    <header className='flex items-center justify-between px-5 py-4 bg-[#FCFCFC]'>
      <div className='flex items-center gap-[82px] flex-1'>
        <Logo />
      </div>
    </header>
  )
}

export default TopBar
