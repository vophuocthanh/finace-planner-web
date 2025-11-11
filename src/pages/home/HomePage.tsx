import { Footer, Header, TestimonialsSection } from '@/components'
import { HeroSection } from '@/components/home/HeroSection'
import { StatisticsSection } from '@/components/home/StatisticsSection'
import { BenefitsSection } from '@/components/home/BenefitsSection'
import { CTASection } from '@/components/home/CTASection'
import { motion } from 'framer-motion'

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='overflow-x-hidden relative w-full min-h-screen bg-gradient-to-b from-gray-950 via-indigo-950/30 to-gray-950'
    >
      <Header />

      <main className='relative'>
        {/* Hero Section */}
        <HeroSection />

        {/* Statistics Section */}
        <StatisticsSection />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </motion.div>
  )
}

export default HomePage
