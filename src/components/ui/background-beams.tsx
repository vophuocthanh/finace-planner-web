import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/core/lib/utils'
import { numberConstants } from '@/configs/consts'
import { backgroundBeamsData, staticPath } from '@/core/shared/data/backgroundBeamsData'

export const BackgroundBeams = React.memo(({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'absolute h-full w-full inset-0 [mask-size:40px] [mask-repeat:no-repeat] flex items-center justify-center',
        className
      )}
    >
      <svg
        className='absolute z-0 w-full h-full pointer-events-none'
        width='100%'
        height='100%'
        viewBox='0 0 696 316'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d={staticPath} stroke='url(#paint0_radial_242_278)' strokeOpacity='0.05' strokeWidth='0.5'></path>

        {backgroundBeamsData.map((path, index) => (
          <motion.path
            key={`path-${index}`}
            d={path}
            stroke={`url(#linearGradient-${index})`}
            strokeOpacity='0.4'
            strokeWidth='0.5'
          ></motion.path>
        ))}
        <defs>
          {backgroundBeamsData.map((index) => (
            <motion.linearGradient
              id={`linearGradient-${index}`}
              key={`gradient-${index}`}
              initial={{
                x1: '0%',
                x2: '0%',
                y1: '0%',
                y2: '0%'
              }}
              animate={{
                x1: ['0%', '100%'],
                x2: ['0%', '95%'],
                y1: ['0%', '100%'],
                y2: ['0%', `${93 + Math.random() * 8}%`]
              }}
              transition={{
                duration: Math.random() * numberConstants.TEN + numberConstants.TEN,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: Math.random() * numberConstants.TEN
              }}
            >
              <stop stopColor='#18CCFC' stopOpacity='0'></stop>
              <stop stopColor='#18CCFC'></stop>
              <stop offset='32.5%' stopColor='#6344F5'></stop>
              <stop offset='100%' stopColor='#AE48FF' stopOpacity='0'></stop>
            </motion.linearGradient>
          ))}

          <radialGradient
            id='paint0_radial_242_278'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(352 34) rotate(90) scale(555 1560.62)'
          >
            <stop offset='0.0666667' stopColor='var(--neutral-300)'></stop>
            <stop offset='0.243243' stopColor='var(--neutral-300)'></stop>
            <stop offset='0.43594' stopColor='white' stopOpacity='0'></stop>
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
})

BackgroundBeams.displayName = 'BackgroundBeams'
