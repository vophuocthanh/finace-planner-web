import { WorldMap } from '@/components/ui/world-map'
import { mapDots } from '@/core/shared/data/mapDots'
import { motion } from 'motion/react'

const textWords = 'Nothing you don’t'

export function WorldMapSection() {
  return (
    <div className='w-full py-40'>
      <div className='mx-auto text-center max-w-7xl'>
        <p className='text-xl font-bold text-black md:text-4xl dark:text-white'>
          Everything you need.{' '}
          <span className='text-neutral-400'>
            {textWords.split('').map((char, idx) => (
              <motion.span
                key={idx}
                className='inline-block'
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </p>
        <p className='max-w-2xl py-4 mx-auto text-sm md:text-lg text-neutral-500'>
          Financial management and visibility in one place. Experience a flexible toolkit that makes every task feel
          like a breeze.
        </p>
      </div>
      <WorldMap dots={mapDots} />
    </div>
  )
}
