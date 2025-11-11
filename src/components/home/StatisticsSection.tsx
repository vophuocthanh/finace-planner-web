import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Network, Users, Coins, Activity } from 'lucide-react'

interface StatItem {
  icon: typeof Network
  value: string
  suffix?: string
  label: string
  color: string
}

const stats: StatItem[] = [
  {
    icon: Network,
    value: '500',
    suffix: 'K+',
    label: 'Active Nodes',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Coins,
    value: '$2.5',
    suffix: 'B+',
    label: 'DeFi TVL',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    icon: Activity,
    value: '50',
    suffix: 'M+',
    label: 'Daily Transactions',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Users,
    value: '100',
    suffix: 'K+',
    label: 'Web3 Developers',
    color: 'from-cyan-400 to-teal-500'
  }
]

const useCountUp = (end: number, duration: number = 2, isInView: boolean) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const startValue = 0

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, isInView])

  return count
}

const StatCard = ({ stat, index }: { stat: StatItem; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ''))
  const count = useCountUp(numericValue, 2, isInView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className='relative p-8 bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-2xl shadow-lg border border-cyan-500/30 overflow-hidden group backdrop-blur-sm'
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      {/* Icon */}
      <div className='relative mb-6'>
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}>
          <stat.icon size={28} className='text-white' />
        </div>
      </div>

      {/* Value */}
      <div className='relative mb-2'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='text-4xl font-bold text-white md:text-5xl'
        >
          {stat.value.includes('$') ? '$' : ''}
          {count}
          {stat.suffix}
        </motion.div>
      </div>

      {/* Label */}
      <p className='relative text-gray-300 text-sm font-medium'>{stat.label}</p>

      {/* Decorative Element */}
      <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full -mr-16 -mt-16' />
    </motion.div>
  )
}

export const StatisticsSection = () => {
  return (
    <section className='relative w-full py-20 overflow-hidden bg-gradient-to-b from-gray-950 via-indigo-950/30 to-gray-950 md:py-32'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-16 text-center'
        >
          <h2 className='mb-4 text-3xl font-bold text-white md:text-5xl'>
            Powering the Decentralized Economy
          </h2>
          <p className='max-w-2xl mx-auto text-lg text-gray-300'>
            Join the revolution of builders, creators, and innovators shaping the future of Web3
          </p>
        </motion.div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

