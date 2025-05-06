import { Footer, Header, TestimonialsSection, WorldMapSection } from '@/components'
import { BackgroundBeamsBanner } from '@/components/background-beams-demo/background-beams-banner'
import { motion } from 'framer-motion'

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='relative w-full min-h-screen overflow-x-hidden bg-white'
    >
      <Header />

      <main>
        <BackgroundBeamsBanner />
        <WorldMapSection />
        <TestimonialsSection />
      </main>

      <Footer />
    </motion.div>
  )
}

export default HomePage
