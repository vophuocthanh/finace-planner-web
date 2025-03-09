import {
  avatarAmazon,
  avatarBmw,
  avatarGoogle,
  avatarMarriot,
  avatarSalesForte,
  avatarShopify,
  avatarWhatApp,
  avatarZara,
  backgroundBanner
} from '@/assets/images'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { BackgroundBeams } from '../ui/background-beams'

const listImgArr = [
  {
    key: 1,
    img: avatarAmazon
  },
  {
    key: 2,
    img: avatarSalesForte
  },
  {
    key: 3,
    img: avatarGoogle
  },
  {
    key: 4,
    img: avatarZara
  },
  {
    key: 5,
    img: avatarShopify
  },
  {
    key: 6,
    img: avatarWhatApp
  },
  {
    key: 7,
    img: avatarBmw
  },
  {
    key: 8,
    img: avatarMarriot
  }
]

export function BackgroundBeamsBanner() {
  return (
    <div className='relative flex flex-col items-center justify-center w-full h-screen antialiased'>
      <div className='flex mx-auto mt-[150px] w-full justify-between'>
        <div className='flex relative left-36 top-[121px] flex-col p-4'>
          <h1 className='w-[568px] z-10 font-sans text-lg font-bold text-transparent md:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600'>
            Financial infrastructure for the internet
          </h1>
          <p className='w-[28rem] mt-10 text-[#425466]'>
            Millions of companies of all sizes use Stripe online and in person to accept payments, send payouts,
            automate financial processes, and ultimately grow revenue.
          </p>
          <div className='flex items-center gap-8 mt-6'>
            <Button className='bg-primary rounded-2xl' iconRight={<ChevronRight />}>
              Start with Payments
            </Button>
            <Button className='bg-white text-[#0A2540] rounded-2xl' iconRight={<ChevronRight />}>
              Contact sales
            </Button>
          </div>
          <div className='flex flex-wrap max-w-5xl gap-10 mt-14'>
            {listImgArr.map((item) => (
              <div key={item.key} className='flex items-center w-56'>
                <img src={item.img} alt='' />
              </div>
            ))}
          </div>
        </div>
        <div>
          <img src={backgroundBanner} alt='' className='h-[48rem] w-full' />
        </div>
      </div>
      <BackgroundBeams />
    </div>
  )
}
