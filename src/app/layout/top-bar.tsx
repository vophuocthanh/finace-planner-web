import { Web3Logo } from '@/components/logo/Web3Logo'

interface LogoProps {
  className?: string
}

const Logo = ({ className = '' }: LogoProps) => {
  return (
    <div className={`flex gap-4 items-center ml-10 ${className}`}>
      <Web3Logo showText={true} size='md' />
    </div>
  )
}

const TopBar = () => {
  return (
    <header className='flex justify-between items-center px-5 py-4 bg-gradient-to-r border-b shadow-lg backdrop-blur-md from-gray-900/95 to-gray-800/95 border-cyan-500/20 shadow-cyan-500/10'>
      <div className='flex items-center gap-[82px] flex-1'>
        <Logo />
      </div>
    </header>
  )
}

export default TopBar
