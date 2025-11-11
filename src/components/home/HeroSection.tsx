import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Wallet, Shield, Zap, Link2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BackgroundBeams } from '@/components/ui/background-beams'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.25, 0, 1]
    }
  }
}

const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

const features = [
  { icon: Wallet, text: 'Web3 Wallet' },
  { icon: Shield, text: 'Decentralized' },
  { icon: Zap, text: 'Smart Contracts' }
]

export const HeroSection = () => {
  return (
    <section className='overflow-hidden relative w-full min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950/50 to-purple-950/30'>
      <div className='absolute inset-0 z-0'>
        <BackgroundBeams />
      </div>

      <div className='relative z-10 px-4 pt-32 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={containerVariants}
          className='flex flex-col items-center text-center'
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className='inline-flex gap-2 items-center px-4 py-2 mb-8 text-sm font-medium text-cyan-400 rounded-full border backdrop-blur-sm bg-cyan-500/10 border-cyan-500/20'
          >
            <Link2 size={16} />
            <span>Powered by Blockchain Technology</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className='mb-6 text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl'
          >
            <span className='block'>Build on the</span>
            <span className='block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500'>
              Decentralized Web
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={itemVariants} className='mb-10 max-w-2xl text-lg text-gray-300 md:text-xl'>
            Experience the future of finance with blockchain technology. Deploy smart contracts, manage your crypto
            assets, and interact with DeFi protocols in a secure, decentralized ecosystem.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className='flex flex-wrap gap-4 justify-center items-center mb-12'>
            <Button
              asChild
              size='lg'
              className='flex gap-2 items-center px-8 py-6 text-base font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 text-gray-950 hover:from-cyan-300 hover:to-blue-400 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105'
            >
              <Link to='/register'>
                <span className='flex gap-2 items-center'>
                  Connect Wallet
                  <ArrowRight size={20} />
                </span>
              </Link>
            </Button>
            <Button
              asChild
              size='lg'
              variant='outline'
              className='flex gap-2 items-center px-8 py-6 text-base font-semibold text-white bg-transparent rounded-full border-2 backdrop-blur-sm transition-all duration-300 border-cyan-500/50 hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-lg hover:scale-105'
            >
              <Link to='/login'>
                <span>Explore dApps</span>
              </Link>
            </Button>
          </motion.div>

          {/* Features */}
          <motion.div variants={itemVariants} className='flex flex-wrap gap-6 justify-center items-center mb-16'>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className='flex gap-2 items-center px-4 py-2 rounded-full border shadow-sm backdrop-blur-sm bg-white/10 border-cyan-500/20'
              >
                <feature.icon size={18} className='text-cyan-400' />
                <span className='text-sm font-medium text-gray-300'>{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div variants={floatingVariants} animate='animate' className='relative w-full max-w-5xl'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className='overflow-hidden relative bg-gradient-to-br rounded-2xl border shadow-2xl backdrop-blur-sm from-gray-900/90 to-indigo-900/90 border-cyan-500/30 shadow-cyan-500/20'
            >
              <div className='flex absolute top-0 right-0 left-0 gap-2 p-4 border-b backdrop-blur-sm bg-gray-900/50 border-cyan-500/20'>
                <div className='w-3 h-3 bg-red-500 rounded-full' />
                <div className='w-3 h-3 bg-yellow-500 rounded-full' />
                <div className='w-3 h-3 bg-green-500 rounded-full' />
              </div>
              <div className='p-8 pt-16'>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className='p-6 bg-gradient-to-br rounded-xl border from-cyan-500/10 to-blue-500/10 border-cyan-500/20'
                    >
                      <div className='mb-3 w-3/4 h-4 rounded animate-pulse bg-cyan-500/20' />
                      <div className='mb-2 w-1/2 h-8 rounded animate-pulse bg-cyan-400/30' />
                      <div className='w-full h-3 rounded animate-pulse bg-cyan-500/20' />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
