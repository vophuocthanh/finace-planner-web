import { BackgroundBeamsBanner, Footer, Header, WorldMapSection } from '@/components'

const HomePage = () => {
  return (
    <div className='relative min-h-screen'>
      <div className='absolute z-0 gradient-background white-background' />
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
