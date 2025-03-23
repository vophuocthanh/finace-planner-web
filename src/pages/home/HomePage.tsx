import { BackgroundBeamsBanner, Footer, Header, WorldMapSection } from '@/components'

const HomePage = () => {
  return (
    <div className='relative w-full min-h-screen'>
      <div className='absolute z-0 w-full h-full md:gradient-background md:white-background' />
      <div className='relative z-10'>
        <Header />
        <BackgroundBeamsBanner />
        <WorldMapSection />
        <Footer />
      </div>
    </div>
  )
}

export default HomePage
