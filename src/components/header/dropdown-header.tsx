import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { path } from '@/core/constants/path'
import { checkToken, clearLS } from '@/core/shared/storage'
import { useGetMe } from '@/hooks/me/useGetMeQuery'
import { CreditCard, LogOut, User } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function DropdownHeader() {
  const { data: getMe } = useGetMe()

  const handleLogout = () => {
    clearLS()
    window.location.reload()
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='select-none'>
        <div className='flex items-center gap-2'>
          <Avatar>
            <AvatarImage src={getMe?.avatar} alt={getMe?.name || 'Avatar'} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 mr-6'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <div className='flex flex-col ml-4'>
          <h1 className='text-sm'>{getMe?.email}</h1>
          <span className='text-xs text-gray-400'>{getMe?.name || 'Guest'}</span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to={path.profile} className='flex items-center justify-between w-full'>
              <User className='w-4 h-4 mr-2' />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {checkToken && (
              <Link to={path.admin.dashboard} className='flex items-center justify-between w-full'>
                <CreditCard className='w-4 h-4 mr-2' />
                <span>Admin</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </Link>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className='w-4 h-4 mr-2' />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
