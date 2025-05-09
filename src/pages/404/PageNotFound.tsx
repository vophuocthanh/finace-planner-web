import { path } from '@/core/constants/path'
import { containerVariants, itemVariants } from '@/styles/style-animation'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50'>
      <motion.div
        initial='hidden'
        animate='visible'
        variants={containerVariants}
        className='flex flex-col items-center justify-center px-4 text-center'
      >
        <motion.div variants={itemVariants} className='relative'>
          <h1 className='text-9xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
            404
          </h1>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className='absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full'
          />
        </motion.div>

        <motion.h2 variants={itemVariants} className='mt-4 text-3xl font-semibold text-gray-800'>
          Oops! Page Not Found
        </motion.h2>

        <motion.p variants={itemVariants} className='mt-2 text-gray-600 max-w-md'>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </motion.p>

        <motion.div variants={itemVariants} className='mt-8'>
          <Link
            to={path.home}
            className='inline-flex items-center px-6 py-3 text-base font-medium text-white transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5 mr-2'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18' />
            </svg>
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default PageNotFound
