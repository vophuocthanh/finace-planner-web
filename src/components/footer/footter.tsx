import { FacebookIcons, LinkedinIcons, TwitterIcons } from '@/assets/icons'
import SectionInViewUp from '@/components/animation/SectionInViewUp'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <SectionInViewUp className='w-full'>
      <div className='w-full h-1 border-t-2 border-t-[#A1A1AA] max-lg:w-[192%]' />
      <div className='py-10 mx-auto space-y-10 max-w-7xl'>
        <div className='flex justify-between gap-10 max-lg:w-[145%] max-lg:ml-[5rem]'>
          <div className='flex items-center gap-6 max-lg:flex-row max-lg:justify-center'>
            <span className='text-[#A1A1AA]'>© 2025 Cobalt Financial Technologies Inc.</span>
            <span className='text-[#A1A1AA]'>Privacy Policy</span>
            <span className='text-[#A1A1AA]'>Terms of Use</span>
          </div>
          <div className='flex items-center gap-6'>
            <Link to=''>
              <img src={TwitterIcons} alt='' />
            </Link>
            <Link to=''>
              <img src={LinkedinIcons} alt='' />
            </Link>
            <Link to=''>
              <img src={FacebookIcons} alt='' />
            </Link>
          </div>
        </div>
        <div className='flex flex-col space-y-6'>
          <span className='w-[718px] text-[#71717A] text-sm max-lg:text-center max-lg:px-3'>
            Cobalt is a trademark or registered trademark of Cobalt Financial Technologies Inc. Any other trademarks are
            the property of their respective owners. Unless otherwise noted, use of third party logos does not imply
            endorsement of, sponsorship of, or affiliation with Cobalt.
          </span>
          <span className='w-[718px] text-[#71717A] text-sm max-lg:text-center max-lg:px-3'>
            Cobalt is a financial technology company, not a bank. Banking services are provided by Celtic Bank and
            Evolve Bank & Trust®, Members FDIC.
          </span>
        </div>
      </div>
    </SectionInViewUp>
  )
}
