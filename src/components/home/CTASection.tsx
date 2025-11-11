import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const CTASection = () => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
  }, [])

  return (
    <section className='relative w-full overflow-hidden py-20 md:py-32 bg-gradient-to-br from-[#04020C] via-[#07112F] to-[#0F0A2F] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25)_0%,_rgba(12,10,37,0)_55%)] before:opacity-80 after:absolute after:inset-x-0 after:bottom-[-20%] after:h-[60%] after:bg-[radial-gradient(circle,_rgba(139,92,246,0.3)_0%,_rgba(4,2,12,0)_70%)] after:blur-3xl'>
      {/* Animated Background Elements */}
      <div className='overflow-hidden absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.12)_0%,_transparent_70%)]' />
        <div className='absolute inset-0 opacity-40'>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className='absolute inset-x-0 h-px bg-gradient-to-r from-transparent to-transparent via-cyan-500/20'
              style={{ top: `${(index + 1) * 15}%` }}
            />
          ))}
        </div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-2 h-2 rounded-full bg-cyan-400/40'
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              scale: 0
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className='relative z-10 px-4 mx-auto max-w-4xl text-center sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='inline-flex items-center justify-center w-16 h-16 mb-6 text-cyan-300 border border-cyan-400/50 rounded-full bg-cyan-500/10 backdrop-blur-md shadow-[0_0_30px_rgba(34,211,238,0.35)]'
          >
            <Rocket size={32} />
          </motion.div>

          <div className='inline-block relative'>
            <span className='absolute -bottom-2 inset-x-4 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-60 blur-lg' />
            <h2 className='relative text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 md:text-5xl lg:text-6xl'>
              Ready to Build on Web3?
            </h2>
          </div>
          <p className='mx-auto mt-6 mb-10 max-w-2xl text-lg text-cyan-100/80 md:text-xl'>
            Deploy smart contracts, orchestrate DeFi strategies, and launch your next-generation dApp inside a secure,
            permissionless ecosystem.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='flex flex-wrap gap-4 justify-center items-center'
          >
            <Button
              asChild
              size='lg'
              className='flex items-center gap-2 px-8 py-6 text-base font-semibold text-gray-950 rounded-full transition-all duration-300 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 hover:shadow-[0_0_35px_rgba(56,189,248,0.45)] hover:scale-105'
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
              className='flex gap-2 items-center px-8 py-6 text-base font-semibold text-cyan-200 rounded-full border-2 backdrop-blur-sm transition-all duration-300 border-cyan-400/40 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-300/60 hover:scale-105'
            >
              <Link to='/login'>
                <span>Explore dApps</span>
              </Link>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='mt-8 text-sm text-cyan-100/70'
          >
            ✓ Permissionless • ✓ Decentralized • ✓ Open Source
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
