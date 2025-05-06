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
    <footer className='pt-16 pb-8 bg-white border-t border-gray-100'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={containerVariants}
          className='grid grid-cols-1 gap-8 pb-12 md:grid-cols-4'
        >
          <motion.div variants={itemVariants} className='col-span-1'>
            <h3 className='mb-4 text-lg font-semibold text-black dark:text-white'>Cobalt Finance</h3>
            <p className='max-w-xs mb-6 text-sm text-neutral-500'>
              Modern financial tools for individuals and businesses to track, manage, and grow their finances.
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
                  className='flex items-center justify-center w-8 h-8 transition-colors rounded-full bg-white/10 hover:bg-primary/20'
                >
                  <img src={social.icon} alt={social.label} className='w-4 h-4' />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {dataFooterLink.map((group) => (
            <motion.div key={group.title} variants={itemVariants} className='col-span-1'>
              <h3 className='mb-4 text-sm font-semibold text-black dark:text-white'>{group.title}</h3>
              <ul className='space-y-3'>
                {group.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.href}
                      className='text-sm transition-colors duration-200 text-neutral-500 hover:text-primary'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className='w-full h-px my-8 bg-neutral-200/20' />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='flex flex-col space-y-6'
        >
          <div className='flex flex-wrap justify-between gap-4'>
            <span className='text-xs text-neutral-500'>© {currentYear} Cobalt Financial Technologies Inc.</span>
            <div className='flex flex-wrap gap-6'>
              <Link to='/' className='text-xs text-neutral-500 hover:text-primary'>
                Privacy Policy
              </Link>
              <Link to='/' className='text-xs text-neutral-500 hover:text-primary'>
                Terms of Use
              </Link>
              <Link to='/' className='text-xs text-neutral-500 hover:text-primary'>
                Cookies
              </Link>
            </div>
          </div>

          <div className='space-y-3'>
            <p className='text-xs text-neutral-500'>
              Cobalt is a trademark or registered trademark of Cobalt Financial Technologies Inc. Any other trademarks
              are the property of their respective owners.
            </p>
            <p className='text-xs text-neutral-500'>
              Cobalt is a financial technology company, not a bank. Banking services are provided by Celtic Bank and
              Evolve Bank & Trust®, Members FDIC.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
