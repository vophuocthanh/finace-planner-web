import { DeleteRoundIcon } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface ModalDeleteItemProps {
  title?: string
  description?: string
  onDelete?: () => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function ModalDeleteItem({ title, description, onDelete, isOpen, onOpenChange }: ModalDeleteItemProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-[350px] sm:max-w-[360px]'>
        <DialogHeader className='flex items-center justify-center'>
          <img src={DeleteRoundIcon} alt='delete' className='mb-4 size-14' />
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <p className='text-sm text-center text-gray-500'>{description}</p>
        </div>
        <DialogFooter>
          <div className='flex items-center justify-center w-full gap-2'>
            <Button type='submit' variant='outline' onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button
              type='submit'
              className='bg-primary hover:bg-white hover:text-primary hover:border-primary'
              onClick={onDelete}
            >
              Xóa
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
