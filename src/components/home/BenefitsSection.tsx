import { motion } from 'framer-motion'
import { Wallet, Lock, Network, Coins, Zap, ShieldCheck } from 'lucide-react'

interface Benefit {
  icon: typeof Wallet
  title: string
  description: string
  gradient: string
}

const benefits: Benefit[] = [
  {
    icon: Wallet,
    title: 'Web3 Wallet Integration',
    description: 'Connect your MetaMask, WalletConnect, or any Web3 wallet seamlessly. Manage all your crypto assets in one secure place.',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Lock,
    title: 'Decentralized & Secure',
    description: 'Your data is stored on the blockchain with cryptographic security. No central authority, no single point of failure.',
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    icon: Network,
    title: 'Multi-Chain Support',
    description: 'Deploy and interact with smart contracts across Ethereum, Polygon, BSC, and other leading blockchain networks.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Zap,
    title: 'Smart Contracts',
    description: 'Automate transactions and agreements with self-executing smart contracts. Trustless, transparent, and immutable.',
    gradient: 'from-cyan-400 to-teal-500'
  },
  {
    icon: Coins,
    title: 'DeFi Protocols',
    description: 'Access decentralized finance protocols for lending, borrowing, staking, and yield farming directly from the platform.',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    icon: ShieldCheck,
    title: 'NFT Marketplace',
    description: 'Create, buy, and sell NFTs with ease. Full support for ERC-721 and ERC-1155 standards with gas optimization.',
    gradient: 'from-pink-500 to-rose-500'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.25, 0, 1]
    }
  }
}

export const BenefitsSection = () => {
  return (
    <section className='relative w-full py-20 overflow-hidden bg-gradient-to-b from-gray-950 to-indigo-950/50 md:py-32'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-16 text-center'
        >
          <h2 className='mb-4 text-3xl font-bold text-white md:text-5xl'>
            Built for the Web3 Ecosystem
          </h2>
          <p className='max-w-2xl mx-auto text-lg text-gray-300'>
            Comprehensive tools and features to build, deploy, and manage your decentralized applications
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className='relative p-8 bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-2xl border border-cyan-500/30 shadow-sm hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 group overflow-hidden backdrop-blur-sm'
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Icon */}
              <div className='relative mb-6'>
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <benefit.icon size={24} className='text-white' />
                </div>
              </div>

              {/* Content */}
              <div className='relative'>
                <h3 className='mb-3 text-xl font-semibold text-white'>{benefit.title}</h3>
                <p className='text-gray-300 leading-relaxed'>{benefit.description}</p>
              </div>

              {/* Decorative Element */}
              <div className='absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full -mr-12 -mb-12 opacity-50' />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

