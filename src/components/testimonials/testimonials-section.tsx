import { dataTestimonials } from '@/_mock/data-testimonials.mock'
import { motion, type Variants } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.25, 0, 1] as const
    }
  }
}

export function TestimonialsSection() {
  return (
    <section className='overflow-hidden py-20 bg-gradient-to-b from-indigo-950/50 via-gray-950 to-gray-950 md:py-32'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-16 text-center'
        >
          <h2 className='mb-4 text-3xl font-bold text-white md:text-5xl'>What Web3 Builders Say</h2>
          <p className='mx-auto max-w-2xl text-lg text-gray-300'>
            Join thousands of developers and creators building the decentralized future
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid grid-cols-1 gap-8 md:grid-cols-3'
        >
          {dataTestimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              custom={idx}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className='relative p-8 bg-gradient-to-br rounded-2xl border shadow-lg backdrop-blur-sm transition-all duration-300 from-gray-900/90 to-gray-800/90 border-cyan-500/30 hover:border-cyan-400/50'
            >
              <div className='flex absolute -top-3 -left-3 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full shadow-lg'>
                <Quote size={20} />
              </div>

              <div className='flex items-center mb-6'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? 'fill-cyan-400 text-cyan-400' : 'text-gray-600'}
                  />
                ))}
              </div>

              <p className='mb-6 italic text-gray-300'>"{testimonial.content}"</p>

              <div className='mt-auto'>
                <h4 className='font-semibold text-white'>{testimonial.name}</h4>
                <p className='text-sm text-gray-400'>
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='flex justify-center mt-16'
        >
          <button className='px-6 py-3 font-medium bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 text-gray-950 hover:from-cyan-300 hover:to-blue-400 hover:shadow-lg hover:shadow-cyan-500/50'>
            Read more success stories
          </button>
        </motion.div>
      </div>
    </section>
  )
}
