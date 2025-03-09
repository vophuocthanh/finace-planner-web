import { Header } from '@/components'
import { BackgroundBeamsBanner } from '@/components/background-beams-demo/background-beams-banner'

const HomePage = () => {
  return (
    <div className='relative min-h-screen'>
      <div className='absolute z-0 gradient-background white-background' />
      <div className='relative z-10'>
        <Header />
        <BackgroundBeamsBanner />
      </div>
    </div>
  )
}

export default HomePage
