import { backgroundBanner } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { BackgroundBeams } from '../ui/background-beams'
import { partnerLogos } from '@/_mock/data-partner-logo.mock'

export interface PartnerLogo {
  id: number
  img: string
  alt: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

export function BackgroundBeamsBanner() {
  return (
    <div className='relative w-full min-h-screen overflow-hidden'>
      <div className='absolute inset-0 z-0 bg-white' />
      <div className='relative z-10 px-4 pt-32 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='grid items-center grid-cols-1 gap-12 lg:grid-cols-2'>
          <motion.div
            initial='hidden'
            animate='visible'
            variants={containerVariants}
            className='flex flex-col space-y-8'
          >
            <motion.h1
              variants={itemVariants}
              className='text-4xl font-bold text-transparent md:text-6xl lg:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600'
            >
              Financial infrastructure for the internet
            </motion.h1>

            <motion.p variants={itemVariants} className='text-lg text-[#425466] max-w-lg'>
              Millions of companies use our platform to accept payments, send payouts, and automate financial processes
              to grow revenue.
            </motion.p>

            <motion.div variants={itemVariants} className='flex flex-wrap gap-4'>
              <Button
                className='flex items-center gap-2 px-6 py-6 text-white transition-all duration-300 rounded-full bg-primary hover:shadow-lg'
                onClick={() => {}}
              >
                <span>Start with Payments</span>
                <ArrowRight size={18} />
              </Button>

              <Button
                className='bg-white text-[#0A2540] rounded-full px-6 py-6 flex items-center gap-2 hover:shadow-lg transition-all duration-300'
                onClick={() => {}}
              >
                <span>Contact sales</span>
                <ArrowRight size={18} />
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className='pt-12'>
              <motion.p variants={itemVariants} className='text-sm text-[#425466] mb-6'>
                Trusted by leading companies worldwide
              </motion.p>

              <div className='grid grid-cols-2 gap-8 sm:grid-cols-4'>
                {partnerLogos.map((logo) => (
                  <motion.div key={logo.id} whileHover={{ scale: 1.05 }} className='flex items-center justify-center'>
                    <img src={logo.img} alt={logo.alt} className='w-auto max-h-10' />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className='hidden lg:block'
          >
            <motion.img
              src={backgroundBanner}
              alt='Financial Dashboard'
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
            />
          </motion.div>
        </div>
      </div>

      <BackgroundBeams />
    </div>
  )
}
