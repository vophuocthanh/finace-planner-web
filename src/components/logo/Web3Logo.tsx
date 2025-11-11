import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface Web3LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: { icon: 24, text: 'text-lg' },
  md: { icon: 32, text: 'text-xl' },
  lg: { icon: 40, text: 'text-2xl' }
}

export const Web3Logo = ({ className = '', showText = true, size = 'md' }: Web3LogoProps) => {
  const { icon: iconSize, text: textSize } = sizeMap[size]

  return (
    <Link to='/' className={`flex gap-3 items-center ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className='relative'
      >
        {/* Glow effect */}
        <div className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-30 blur-md animate-pulse' />

        {/* Main logo container */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox='0 0 40 40'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='relative'
        >
          {/* Background circle with gradient */}
          <defs>
            <linearGradient id='logoGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop offset='0%' stopColor='#06b6d4' stopOpacity='1' />
              <stop offset='50%' stopColor='#3b82f6' stopOpacity='1' />
              <stop offset='100%' stopColor='#8b5cf6' stopOpacity='1' />
            </linearGradient>
            <linearGradient id='blockGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop offset='0%' stopColor='#22d3ee' stopOpacity='0.8' />
              <stop offset='100%' stopColor='#3b82f6' stopOpacity='0.8' />
            </linearGradient>
          </defs>

          {/* Outer ring */}
          <circle cx='20' cy='20' r='18' fill='url(#logoGradient)' opacity='0.2' />

          {/* Blockchain blocks - Top */}
          <motion.rect
            x='12'
            y='8'
            width='6'
            height='6'
            rx='1'
            fill='url(#blockGradient)'
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <motion.rect
            x='22'
            y='8'
            width='6'
            height='6'
            rx='1'
            fill='url(#blockGradient)'
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          {/* Connection lines */}
          <motion.line
            x1='18'
            y1='11'
            x2='22'
            y2='11'
            stroke='url(#logoGradient)'
            strokeWidth='1.5'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />

          {/* Middle block */}
          <motion.rect
            x='15'
            y='16'
            width='10'
            height='8'
            rx='1'
            fill='url(#blockGradient)'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />

          {/* Connection lines to middle */}
          <motion.line
            x1='15'
            y1='14'
            x2='15'
            y2='16'
            stroke='url(#logoGradient)'
            strokeWidth='1.5'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
          <motion.line
            x1='25'
            y1='14'
            x2='25'
            y2='16'
            stroke='url(#logoGradient)'
            strokeWidth='1.5'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />

          {/* Bottom blocks */}
          <motion.rect
            x='10'
            y='26'
            width='6'
            height='6'
            rx='1'
            fill='url(#blockGradient)'
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          />
          <motion.rect
            x='24'
            y='26'
            width='6'
            height='6'
            rx='1'
            fill='url(#blockGradient)'
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />

          {/* Connection lines from middle to bottom */}
          <motion.line
            x1='13'
            y1='24'
            x2='13'
            y2='26'
            stroke='url(#logoGradient)'
            strokeWidth='1.5'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />
          <motion.line
            x1='27'
            y1='24'
            x2='27'
            y2='26'
            stroke='url(#logoGradient)'
            strokeWidth='1.5'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />

          {/* Connection line between bottom blocks */}
          <motion.line
            x1='16'
            y1='29'
            x2='24'
            y2='29'
            stroke='url(#logoGradient)'
            strokeWidth='1.5'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          />
        </svg>
      </motion.div>

      {showText && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 ${textSize}`}
        >
          Web3
        </motion.span>
      )}
    </Link>
  )
}
