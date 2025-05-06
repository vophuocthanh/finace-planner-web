import { dataTestimonials } from '@/_mock/data-testimonials.mock'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

export function TestimonialsSection() {
  return (
    <section className='py-20 overflow-hidden bg-white'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-16 text-center'
        >
          <h2 className='mb-4 text-3xl font-bold md:text-5xl'>What our customers say</h2>
          <p className='max-w-2xl mx-auto text-lg text-neutral-500'>
            Join thousands of satisfied users who have transformed their financial management
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
              className='relative p-8 border shadow-lg bg-white/10 backdrop-blur-sm rounded-2xl border-white/10'
            >
              <div className='absolute flex items-center justify-center w-12 h-12 text-white rounded-full -top-3 -left-3 bg-primary'>
                <Quote size={20} />
              </div>

              <div className='flex items-center mb-6'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                  />
                ))}
              </div>

              <p className='mb-6 italic text-neutral-700 dark:text-neutral-300'>"{testimonial.content}"</p>

              <div className='mt-auto'>
                <h4 className='font-semibold text-black dark:text-white'>{testimonial.name}</h4>
                <p className='text-sm text-neutral-500'>
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
          <button className='px-6 py-3 font-medium text-white transition-all duration-300 rounded-full bg-primary hover:shadow-lg'>
            Read more success stories
          </button>
        </motion.div>
      </div>
    </section>
  )
}
