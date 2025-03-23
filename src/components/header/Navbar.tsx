import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='relative '>
      <div className='container flex items-center justify-between px-6 py-4 mx-auto max-lg:mr-[195px]'>
        {/* Logo */}

        {/* Menu Desktop */}
        <div className='items-center hidden gap-6 lg:flex'>
          <Link to='/' className='text-[#8987A1] hover:text-[#4E47FF] transition-colors duration-200 ease-in-out'>
            Products
          </Link>
          <Link to='/' className='text-[#8987A1] hover:text-[#4E47FF] transition-colors duration-200 ease-in-out'>
            Solutions
          </Link>
          <Link to='/' className='text-[#8987A1] hover:text-[#4E47FF] transition-colors duration-200 ease-in-out'>
            Developers
          </Link>
          <Link to='/' className='text-[#8987A1] hover:text-[#4E47FF] transition-colors duration-200 ease-in-out'>
            Pricing
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button onClick={() => setIsOpen(!isOpen)} className='p-3 bg-gray-100 rounded-lg shadow-md lg:hidden'>
          {isOpen ? <X size={24} className='text-[#4E47FF]' /> : <Menu size={24} className='text-[#4E47FF]' />}
        </button>
      </div>

      {/* Dropdown Menu khi mở (Mobile) */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-md transition-transform duration-300 rounded-md ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none rounded-md'
        } lg:hidden`}
      >
        <div className='flex flex-col items-center gap-4 p-4'>
          <Link to='/' className='text-[#8987A1] hover:text-[#4E47FF] transition-colors duration-200 ease-in-out'>
            Products
          </Link>
          <Link to='/' className='text-[#8987A1] hover:text-[#4E47FF] transition-colors duration-200 ease-in-out'>
            Solutions
          </Link>
          <Link to='/' className='text-[#8987A1] hover:text-[#4E47FF] transition-colors duration-200 ease-in-out'>
            Developers
          </Link>
          <Link to='/' className='text-[#8987A1] hover:text-[#4E47FF] transition-colors duration-200 ease-in-out'>
            Pricing
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
