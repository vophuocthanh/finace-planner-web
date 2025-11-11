import { dataFooterLink, socialLinks } from '@/_mock/data-footer-link.mock'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4 }
  }
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='pt-16 pb-8 bg-gradient-to-b to-black border-t from-gray-950 border-cyan-500/20'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={containerVariants}
          className='grid grid-cols-1 gap-8 pb-12 md:grid-cols-4'
        >
          <motion.div variants={itemVariants} className='col-span-1'>
            <h3 className='mb-4 text-lg font-semibold text-white'>Web3 Platform</h3>
            <p className='mb-6 max-w-xs text-sm text-gray-400'>
              Building the decentralized future. Deploy smart contracts, manage crypto assets, and interact with DeFi
              protocols.
            </p>

            <div className='flex space-x-4'>
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  target='_blank'
                  rel='noopener noreferrer'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className='flex justify-center items-center w-8 h-8 rounded-full border transition-colors bg-white/10 border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-400/40'
                >
                  <img src={social.icon} alt={social.label} className='w-4 h-4' />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {dataFooterLink.map((group) => (
            <motion.div key={group.title} variants={itemVariants} className='col-span-1'>
              <h3 className='mb-4 text-sm font-semibold text-white'>{group.title}</h3>
              <ul className='space-y-3'>
                {group.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.href}
                      className='text-sm text-gray-400 transition-colors duration-200 hover:text-cyan-400'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className='my-8 w-full h-px bg-gradient-to-r from-transparent to-transparent via-cyan-500/30' />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='flex flex-col space-y-6'
        >
          <div className='flex flex-wrap gap-4 justify-between'>
            <span className='text-xs text-gray-400'>© {currentYear} Web3 Platform. All rights reserved.</span>
            <div className='flex flex-wrap gap-6'>
              <Link to='/' className='text-xs text-gray-400 transition-colors hover:text-cyan-400'>
                Privacy Policy
              </Link>
              <Link to='/' className='text-xs text-gray-400 transition-colors hover:text-cyan-400'>
                Terms of Use
              </Link>
              <Link to='/' className='text-xs text-gray-400 transition-colors hover:text-cyan-400'>
                Cookies
              </Link>
            </div>
          </div>

          <div className='space-y-3'>
            <p className='text-xs text-gray-500'>
              Built on blockchain technology. Decentralized, permissionless, and open source.
            </p>
            <p className='text-xs text-gray-500'>
              This platform is not a financial institution. Always do your own research (DYOR) before making any
              financial decisions.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
