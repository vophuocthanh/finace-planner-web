import React, { Suspense, useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { mapDots } from '@/core/shared/data/mapDots'
import { dataFeatures } from '@/_mock/data-features.mock'
import LoadingCM from '@/components/loading/loading-cm'

const WorldMap = React.lazy(() => import('@/components/ui/world-map').then((module) => ({ default: module.WorldMap })))

const optimizedMapDots = mapDots.slice(0, 4)

const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
}

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export function WorldMapSection() {
  const [shouldRenderMap, setShouldRenderMap] = useState(false)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
          setShouldRenderMap(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('world-map-section')
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  const featureCards = useMemo(
    () => (
      <div className='grid grid-cols-1 gap-6 mb-20 md:grid-cols-2 lg:grid-cols-4'>
        {dataFeatures.map((feature) => (
          <motion.div
            key={feature.id}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            variants={featureVariants}
            className='p-6 transition-all duration-300 border shadow-sm bg-white/10 rounded-xl border-neutral-200/10 hover:shadow-md'
          >
            <div className='flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gradient-to-r from-primary to-indigo-400'>
              <span className='font-bold text-white'>{feature.id}</span>
            </div>
            <h3 className='mb-2 text-xl font-semibold text-black dark:text-white'>{feature.title}</h3>
            <p className='text-neutral-500'>{feature.description}</p>
          </motion.div>
        ))}
      </div>
    ),
    [isInView]
  )

  return (
    <section id='world-map-section' className='w-full py-20 overflow-hidden bg-white md:py-40'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>
          <motion.h2
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            variants={textVariants}
            className='mb-6 text-3xl font-bold md:text-5xl'
          >
            <span className='text-black dark:text-white'>Everything you need. </span>
            <span className='text-neutral-400'>Nothing you don't</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-2xl mx-auto text-base md:text-lg text-neutral-500'
          >
            Financial management and visibility in one place. Experience a flexible toolkit that makes every task feel
            like a breeze.
          </motion.p>
        </div>

        {featureCards}

        {shouldRenderMap && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <Suspense fallback={<LoadingCM />}>
              <WorldMap dots={optimizedMapDots} />
            </Suspense>
          </motion.div>
        )}
      </div>
    </section>
  )
}
