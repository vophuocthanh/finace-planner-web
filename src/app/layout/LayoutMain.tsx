import Sidebar from '@/app/layout/side-bar'
import { ReactNode } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
interface ILayoutMainProps {
  children: ReactNode
}

const LayoutMain = ({ children }: ILayoutMainProps) => {
  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <main className='flex-1 overflow-auto bg-[#F4F4F4]'>
          <div className='w-full h-16 bg-[#FCFCFC]  px-4 fixed z-50'>
            <Avatar className='absolute top-4 left-[21rem] md:left-[97rem]'>
              <AvatarImage
                src='https://thuthuatnhanh.com/wp-content/uploads/2022/04/Hinh-nen-Songoku-4K-dep-nhat.jpg'
                alt='@shadcn'
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className='flex-1 px-2 py-2 mt-16'>{children}</div>
        </main>
      </div>
    </div>
  )
}

export default LayoutMain
